'use client'

import { useState } from 'react'
import { submitTradeApplication, type ApplicationData } from './actions'
import { createClient } from '@/lib/supabase/client'

const BUSINESS_TYPES = ['Sole Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Public Limited', 'Other']
const BUYER_TYPES = ['Retailer', 'Wholesaler', 'Distributor', 'Jewellery Chain', 'Online Brand', 'Designer', 'Export Buyer']
const CATEGORIES = ['Rings', 'Earrings', 'Pendants', 'Necklaces', 'Bracelets', 'Bangles', 'Mangalsutras', 'Men\'s Jewellery']
const PURCHASE_VALUES = ['Below ₹5 Lakhs', '₹5L - ₹15L', '₹15L - ₹50L', '₹50L - ₹1Cr', 'Above ₹1Cr']

type DocKey = 'gst_certificate' | 'pan_card' | 'visiting_card' | 'store_photo'

type FormDataState = Omit<ApplicationData, 'documents'> & {
  documents: {
    gst_certificate?: { path: string; name: string };
    pan_card?: { path: string; name: string };
    visiting_card?: { path: string; name: string };
    store_photo?: { path: string; name: string };
  }
}

const INITIAL_DATA: FormDataState = {
  legalBusinessName: '',
  tradingName: '',
  businessType: '',
  gstNumber: '',
  panNumber: '',
  address: '',
  city: '',
  state: '',
  ownerName: '',
  mobile: '',
  whatsapp: '',
  email: '',
  buyerType: [],
  categoriesRequired: [],
  monthlyPurchaseValue: '',
  documents: {}
}

export default function TradeApplicationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormDataState>(INITIAL_DATA)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadingDocs, setUploadingDocs] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState('')

  const supabase = createClient()

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    if (currentStep === 1) {
      if (!formData.legalBusinessName.trim()) {
        newErrors.legalBusinessName = 'Legal business name is required'
        isValid = false
      }
    } else if (currentStep === 2) {
      if (!formData.ownerName.trim()) {
        newErrors.ownerName = 'Owner name is required'
        isValid = false
      }
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required'
        isValid = false
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required'
        isValid = false
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
        isValid = false
      }
    } else if (currentStep === 4) {
      if (!formData.documents.gst_certificate?.path) {
        newErrors.gst_certificate = 'GST Certificate is required and must finish uploading'
        isValid = false
      }
      if (!formData.documents.pan_card?.path) {
        newErrors.pan_card = 'PAN Card is required and must finish uploading'
        isValid = false
      }
      // If any document is currently uploading, block progression
      if (Object.values(uploadingDocs).some(isUploading => isUploading)) {
        setGlobalError('Please wait for all documents to finish uploading.')
        isValid = false
      }
    }

    setErrors(newErrors)
    if (isValid) setGlobalError('')
    return isValid
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
    setGlobalError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCheckboxChange = (group: 'buyerType' | 'categoriesRequired', value: string) => {
    setFormData(prev => {
      const current = prev[group]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [group]: updated }
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: DocKey) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [type]: 'File exceeds 5MB limit' }))
      return
    }
    const isPdfOrImage = file.type === 'application/pdf' || file.type.startsWith('image/')
    if (!isPdfOrImage) {
      setErrors(prev => ({ ...prev, [type]: 'Must be a PDF or Image' }))
      return
    }

    setUploadingDocs(prev => ({ ...prev, [type]: true }))
    setErrors(prev => ({ ...prev, [type]: '' }))

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('buyer-documents')
        .upload(`applications/${fileName}`, file)

      if (error) throw error

      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: { path: data.path, name: file.name }
        }
      }))
    } catch (err) {
      console.error(err)
      setErrors(prev => ({ ...prev, [type]: err instanceof Error ? err.message : 'Failed to upload document' }))
    } finally {
      setUploadingDocs(prev => ({ ...prev, [type]: false }))
      // Reset input value to allow re-uploading the same file if needed
      e.target.value = ''
    }
  }

  const handleRemoveFile = (type: DocKey) => {
    setFormData(prev => {
      const newDocs = { ...prev.documents }
      delete newDocs[type]
      return { ...prev, documents: newDocs }
    })
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return // Final safety check before submit

    setIsSubmitting(true)
    setGlobalError('')

    const payload: ApplicationData = {
      ...formData,
      documents: {
        gst_certificate: formData.documents.gst_certificate?.path,
        pan_card: formData.documents.pan_card?.path,
        visiting_card: formData.documents.visiting_card?.path,
        store_photo: formData.documents.store_photo?.path,
      }
    }

    const result = await submitTradeApplication(payload)
    
    if (result.success) {
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setGlobalError(result.error || 'An unexpected error occurred.')
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white max-w-[860px] mx-auto p-12 border border-ira-border/50 shadow-sm text-center">
        <svg className="w-16 h-16 text-ira-gold mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="font-serif text-3xl text-ira-teal mb-4">Application Submitted</h2>
        <p className="text-ira-muted">
          Your application has been received and will be reviewed by the Ira Jewels business team. 
          We will contact you shortly regarding the next steps.
        </p>
      </div>
    )
  }

  const steps = ['Business Info', 'Contact Info', 'Buying Profile', 'Documents', 'Review']

  const renderInput = (label: string, name: keyof FormDataState, required = false, type = 'text') => {
    // Only handling string fields here
    const val = formData[name] as string
    const err = errors[name]
    return (
      <div className="mb-5">
        <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">
          {label} {required && <span className="text-ira-gold">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={val}
          onChange={handleChange}
          className={`w-full bg-ira-ivory/50 border ${err ? 'border-red-400' : 'border-ira-border'} px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors`}
        />
        {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
      </div>
    )
  }

  const renderDocUpload = (label: string, type: DocKey, required = false) => {
    const err = errors[type]
    const isUploading = uploadingDocs[type]
    const doc = formData.documents[type]

    return (
      <div className="mb-6 p-5 border border-ira-border/30 bg-ira-ivory/20">
        <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-3 font-semibold">
          {label} {required && <span className="text-ira-gold">*</span>}
        </label>
        
        {doc ? (
          <div className="flex items-center justify-between bg-white border border-ira-teal/20 px-4 py-3">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-ira-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-ira-teal truncate max-w-[200px] sm:max-w-xs">{doc.name}</span>
            </div>
            <button 
              type="button" 
              onClick={() => handleRemoveFile(type)}
              className="text-xs text-red-500 hover:text-red-700 uppercase tracking-wider"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              id={`upload-${type}`}
              className="hidden"
              accept=".pdf,image/*"
              onChange={(e) => handleFileUpload(e, type)}
              disabled={isUploading}
            />
            <label 
              htmlFor={`upload-${type}`}
              className={`inline-block px-6 py-2 border text-[11px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                isUploading 
                  ? 'border-ira-muted text-ira-muted cursor-not-allowed' 
                  : 'border-ira-teal text-ira-teal hover:bg-ira-teal hover:text-white'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Select File'}
            </label>
            <p className="text-[10px] text-ira-muted mt-2">Max 5MB. PDF or Image.</p>
          </div>
        )}
        {err && <p className="text-red-500 text-xs mt-2">{err}</p>}
      </div>
    )
  }

  return (
    <div className="bg-white max-w-[860px] mx-auto border border-ira-border/50 shadow-sm">
      {/* Progress Indicator */}
      <div className="flex justify-between px-6 sm:px-12 pt-10 pb-6 border-b border-ira-border/30 overflow-x-auto">
        {steps.map((label, idx) => {
          const stepNum = idx + 1
          const isActive = step === stepNum
          const isCompleted = stepNum < step

          return (
            <div key={label} className="flex flex-col items-center min-w-[80px]">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs mb-2 transition-colors ${
                isActive ? 'bg-ira-teal text-white' :
                isCompleted ? 'bg-ira-gold text-white' :
                'bg-ira-ivory border border-ira-border text-ira-muted'
              }`}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <span className={`text-[9px] uppercase tracking-[0.1em] text-center ${isActive || isCompleted ? 'text-ira-teal' : 'text-ira-muted'}`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="p-6 sm:p-12">
        {globalError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
            {globalError}
          </div>
        )}

        {/* Step 1: Business Information */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-serif text-3xl text-ira-teal mb-8">Business Information</h2>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {renderInput('Legal Business Name', 'legalBusinessName', true)}
              {renderInput('Trading Name', 'tradingName')}
              
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">Business Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full bg-ira-ivory/50 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
                >
                  <option value="">Select Type...</option>
                  {BUSINESS_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              {renderInput('GST Number', 'gstNumber')}
              {renderInput('PAN Number', 'panNumber')}
            </div>
            
            <div className="mt-2">
              {renderInput('Business Address', 'address')}
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {renderInput('City', 'city')}
              {renderInput('State', 'state')}
            </div>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-serif text-3xl text-ira-teal mb-8">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {renderInput('Owner Name', 'ownerName', true)}
              {renderInput('Email Address', 'email', true, 'email')}
              {renderInput('Mobile Number', 'mobile', true, 'tel')}
              {renderInput('WhatsApp Number', 'whatsapp', false, 'tel')}
            </div>
          </div>
        )}

        {/* Step 3: Buying Profile */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-serif text-3xl text-ira-teal mb-8">Buying Profile</h2>
            
            <div className="mb-8">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-4">Buyer Type</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BUYER_TYPES.map(type => (
                  <label key={type} onClick={() => handleCheckboxChange('buyerType', type)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      formData.buyerType.includes(type) ? 'bg-ira-teal border-ira-teal' : 'border-ira-border group-hover:border-ira-teal'
                    }`}>
                      {formData.buyerType.includes(type) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm text-ira-muted group-hover:text-ira-teal transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-4">Product Categories Required</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CATEGORIES.map(category => (
                  <label key={category} onClick={() => handleCheckboxChange('categoriesRequired', category)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      formData.categoriesRequired.includes(category) ? 'bg-ira-teal border-ira-teal' : 'border-ira-border group-hover:border-ira-teal'
                    }`}>
                      {formData.categoriesRequired.includes(category) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm text-ira-muted group-hover:text-ira-teal transition-colors">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">Approximate Monthly Purchase Value</label>
              <select
                name="monthlyPurchaseValue"
                value={formData.monthlyPurchaseValue}
                onChange={handleChange}
                className="w-full sm:w-1/2 bg-ira-ivory/50 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
              >
                <option value="">Select Range...</option>
                {PURCHASE_VALUES.map(val => <option key={val} value={val}>{val}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-serif text-3xl text-ira-teal mb-8">Documents</h2>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {renderDocUpload('GST Certificate', 'gst_certificate', true)}
              {renderDocUpload('PAN Card', 'pan_card', true)}
              {renderDocUpload('Visiting Card', 'visiting_card')}
              {renderDocUpload('Store Photograph', 'store_photo')}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-serif text-3xl text-ira-teal mb-8">Review Application</h2>
            
            <div className="space-y-8 text-sm">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold border-b border-ira-border/50 pb-2 mb-4">Business Information</h3>
                <div className="grid grid-cols-2 gap-4 text-ira-muted">
                  <p><strong className="text-ira-teal font-medium">Legal Name:</strong> {formData.legalBusinessName}</p>
                  <p><strong className="text-ira-teal font-medium">Trading Name:</strong> {formData.tradingName || '-'}</p>
                  <p><strong className="text-ira-teal font-medium">Type:</strong> {formData.businessType || '-'}</p>
                  <p><strong className="text-ira-teal font-medium">Location:</strong> {formData.city}, {formData.state}</p>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold border-b border-ira-border/50 pb-2 mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-ira-muted">
                  <p><strong className="text-ira-teal font-medium">Owner:</strong> {formData.ownerName}</p>
                  <p><strong className="text-ira-teal font-medium">Email:</strong> {formData.email}</p>
                  <p><strong className="text-ira-teal font-medium">Mobile:</strong> {formData.mobile}</p>
                  <p><strong className="text-ira-teal font-medium">WhatsApp:</strong> {formData.whatsapp || '-'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold border-b border-ira-border/50 pb-2 mb-4">Documents Attached</h3>
                <ul className="list-disc pl-5 text-ira-muted space-y-1">
                  <li>GST Certificate: {formData.documents.gst_certificate?.name}</li>
                  <li>PAN Card: {formData.documents.pan_card?.name}</li>
                  {formData.documents.visiting_card && <li>Visiting Card: {formData.documents.visiting_card.name}</li>}
                  {formData.documents.store_photo && <li>Store Photo: {formData.documents.store_photo.name}</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-between mt-12 pt-6 border-t border-ira-border/30">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="px-6 py-3 border border-ira-border text-[11px] uppercase tracking-[0.08em] text-ira-teal hover:bg-ira-ivory transition-colors disabled:opacity-50"
            >
              Back
            </button>
          ) : <div></div>}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-ira-teal text-[11px] uppercase tracking-[0.08em] text-white hover:bg-ira-teal/90 transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-ira-teal text-[11px] uppercase tracking-[0.08em] text-white hover:bg-ira-teal/90 transition-colors disabled:bg-ira-muted flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

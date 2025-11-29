'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Search,
  CheckCircle,
  XCircle,
  Shield,
  ExternalLink,
  Loader2,
  QrCode,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CertificateData {
  verified: boolean
  certificate?: {
    certificate_number: string
    student_name: string
    program: string
    institution: string
    class_of_degree?: string
    cgpa?: number
    date_awarded: string
    date_issued: string
    status: 'ISSUED' | 'REVOKED'
    is_on_chain: boolean
    transaction_hash?: string
  }
  blockchain?: {
    network: string
    block_number: number
    timestamp: string
  }
}

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CertificateData | null>(null)
  const [error, setError] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!code.trim()) {
      setError('Please enter a verification code')
      return
    }

    setIsLoading(true)

    try {
      // For demo purposes, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo data - in production, this would be an API call
      if (code.toUpperCase() === 'DEMO-1234-ABCD' || code.length >= 10) {
        setResult({
          verified: true,
          certificate: {
            certificate_number: 'FBC-2024-000123',
            student_name: 'John Doe',
            program: 'Bachelor of Science in Computer Science',
            institution: 'Freetown Business College',
            class_of_degree: 'First Class Honours',
            cgpa: 3.85,
            date_awarded: '2024-07-15',
            date_issued: '2024-07-20',
            status: 'ISSUED',
            is_on_chain: true,
            transaction_hash: '0x1234...abcd',
          },
          blockchain: {
            network: 'Polygon',
            block_number: 45678901,
            timestamp: '2024-07-20T10:30:00Z',
          },
        })
      } else {
        setResult({
          verified: false,
        })
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">EduCloud</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Certificate Verification
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Verify the authenticity of any EduCloud-issued certificate
            </p>
          </div>

          {/* Verification Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Enter Verification Code</CardTitle>
              <CardDescription>
                Found on the certificate or via QR code scan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., ABCD-1234-EFGH"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="pl-10 uppercase"
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Verify'
                  )}
                </Button>
              </form>

              {error && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <QrCode className="h-4 w-4" />
                <span>Or scan the QR code on the certificate</span>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {result.verified && result.certificate ? (
                  <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <CardTitle className="text-green-700 dark:text-green-400">
                            Certificate Verified
                          </CardTitle>
                          <CardDescription>
                            This certificate is authentic and valid
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Certificate Details */}
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Student Name</span>
                            <p className="font-semibold">{result.certificate.student_name}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Certificate Number</span>
                            <p className="font-semibold font-mono">{result.certificate.certificate_number}</p>
                          </div>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500">Program</span>
                          <p className="font-semibold">{result.certificate.program}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Institution</span>
                            <p className="font-semibold">{result.certificate.institution}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Date Awarded</span>
                            <p className="font-semibold">
                              {new Date(result.certificate.date_awarded).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>

                        {result.certificate.class_of_degree && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm text-gray-500">Class of Degree</span>
                              <p className="font-semibold">{result.certificate.class_of_degree}</p>
                            </div>
                            {result.certificate.cgpa && (
                              <div>
                                <span className="text-sm text-gray-500">CGPA</span>
                                <p className="font-semibold">{result.certificate.cgpa.toFixed(2)}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Blockchain Info */}
                      {result.certificate.is_on_chain && result.blockchain && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-600">
                              Blockchain Verified
                            </span>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Network</span>
                              <span className="font-medium">{result.blockchain.network}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Block Number</span>
                              <span className="font-mono">{result.blockchain.block_number}</span>
                            </div>
                            {result.certificate.transaction_hash && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Transaction</span>
                                <a
                                  href={`https://polygonscan.com/tx/${result.certificate.transaction_hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-600 hover:underline font-mono"
                                >
                                  {result.certificate.transaction_hash}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Badge variant="success">Verified</Badge>
                        {result.certificate.is_on_chain && (
                          <Badge variant="info">On Blockchain</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                          <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <CardTitle className="text-red-700 dark:text-red-400">
                            Certificate Not Found
                          </CardTitle>
                          <CardDescription>
                            We could not verify this certificate
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        The verification code you entered does not match any certificate in our system.
                        Please check the code and try again, or contact the issuing institution.
                      </p>
                      <div className="mt-4">
                        <Badge variant="destructive">Not Verified</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo hint */}
          <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Demo:</strong> Try entering <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">DEMO-1234-ABCD</code> to see a verified certificate example.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

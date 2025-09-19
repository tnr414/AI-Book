import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart, Zap, Shield } from 'lucide-react';

const MicrosoftLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-5 w-5 mr-2">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11"y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
  

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <MicrosoftLogo />
            <span className="font-semibold text-lg">Microsoft</span>
            <div className="h-6 w-px bg-gray-300 mx-4"></div>
            <span className="font-semibold text-lg">Intelligent Book</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#" className="hover:text-blue-600" prefetch={false}>
              Products
            </Link>
            <Link href="#" className="hover:text-blue-600" prefetch={false}>
              Solutions
            </Link>
            <Link href="#" className="hover:text-blue-600" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className="hover:text-blue-600" prefetch={false}>
              Partners
            </Link>
            <Link href="#" className="hover:text-blue-600" prefetch={false}>
              Resources
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gray-50 py-20 md:py-32">
        <div
            className="absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl"></div>
            <div className="absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/2 rounded-full bg-purple-100/50 blur-3xl"></div>
        </div>
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Azure AI Document Intelligence
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
              Accelerate information extraction from documents.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/app">Try for free</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Tabs Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="text-center mb-12">
                  <p className="text-sm font-semibold text-blue-600 uppercase">OVERVIEW</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Quickly extract text and structure from documents
                  </h2>
                  <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                    Intelligent Book is an AI service that applies advanced machine learning to extract text, key-value pairs, tables, and structures from documents automatically and accurately. Turn documents into usable data and shift your focus to acting on information rather than compiling it.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Card>
                        <CardHeader>
                            <CardTitle>Use AI to Build Document Processing Workflows</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Learn how to accelerate your business processes by automating text extraction with AI Document Intelligence. This webinar features hands-on demos for key use cases such as document processing, knowledge mining, and industry-specific AI model customization.</p>
                        </CardContent>
                    </Card>
                    <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">[Video Placeholder]</p>
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="features">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500" /> High Accuracy</CardTitle></CardHeader>
                    <CardContent><p>Get the most accurate text extraction available.</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><BarChart className="text-blue-500" /> Structured Data</CardTitle></CardHeader>
                    <CardContent><p>Extract tables, key-value pairs, and more.</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="text-yellow-500" /> Fast Processing</CardTitle></CardHeader>
                    <CardContent><p>Analyze documents in seconds, not hours.</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="text-red-500" /> Secure & Private</CardTitle></CardHeader>
                    <CardContent><p>Your data is processed securely and privately.</p></CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="pricing">
                <p className="text-center text-gray-500">Pricing information coming soon.</p>
              </TabsContent>
              <TabsContent value="faq">
                <p className="text-center text-gray-500">Frequently Asked Questions coming soon.</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto py-12 px-4 md:px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Microsoft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

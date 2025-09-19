import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, BookText, Video, ClipboardCheck, PlayCircle } from 'lucide-react';
import Image from 'next/image';

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
              Intelligent Book
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
              Transform your reading into an interactive, AI-powered experience.
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
                    Bring Your Books to Life with AI
                  </h2>
                  <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                    Intelligent Book is an innovative AI service that transforms static PDFs into dynamic, interactive learning experiences. Upload your book, and our advanced AI will help you understand concepts, answer questions, simplify complex text, and even generate quizzes to test your knowledge.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Card>
                        <CardHeader>
                            <CardTitle>Unlock a New Way of Reading</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Learn how to accelerate your learning and comprehension by turning any book into an AI companion. This webinar demonstrates key features like the AI chat assistant, text simplifier, and on-demand video explanations to help you get the most out of your reading.</p>
                        </CardContent>
                    </Card>
                    <div className="relative bg-gray-200 aspect-video rounded-lg flex items-center justify-center overflow-hidden">
                        <Image src="https://picsum.photos/seed/ai-book/600/400" alt="Intelligent Book Demo" fill objectFit="cover" data-ai-hint="ai book" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <PlayCircle className="h-20 w-20 text-white/70 hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="features">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="text-blue-500" /> AI Chat Assistant</CardTitle></CardHeader>
                    <CardContent><p>Ask questions about the content and get instant, context-aware answers.</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><BookText className="text-purple-500" /> Text Simplification</CardTitle></CardHeader>
                    <CardContent><p>Select complex passages and let AI re-explain them in simpler terms.</p></CardContent>
                  </Card>
                   <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Video className="text-green-500" /> Video Explanations</CardTitle></CardHeader>
                    <CardContent><p>Generate short, animated video explanations for selected text on the fly.</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardCheck className="text-yellow-500" /> AI Quiz Generator</CardTitle></CardHeader>
                    <CardContent><p>Test your knowledge with automatically generated quizzes for any chapter.</p></CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="pricing">
                 <div className="text-center">
                     <h3 className="text-2xl font-bold mb-4">Simple, Transparent Pricing</h3>
                     <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                         <Card>
                             <CardHeader><CardTitle>Free</CardTitle></CardHeader>
                             <CardContent className="space-y-2">
                                 <p className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                                 <p>Process 1 book per month</p>
                                 <p>Basic AI features</p>
                                 <Button className="w-full mt-4" variant="outline">Get Started</Button>
                             </CardContent>
                         </Card>
                         <Card className="border-blue-500 shadow-lg">
                              <CardHeader><CardTitle>Pro</CardTitle></CardHeader>
                             <CardContent className="space-y-2">
                                 <p className="text-3xl font-bold">$15<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                                 <p>Process 20 books per month</p>
                                 <p>All AI features</p>
                                 <Button className="w-full mt-4">Choose Pro</Button>
                             </CardContent>
                         </Card>
                         <Card>
                             <CardHeader><CardTitle>Enterprise</CardTitle></CardHeader>
                             <CardContent className="space-y-2">
                                 <p className="text-3xl font-bold">Custom</p>
                                 <p>Unlimited books & users</p>
                                 <p>Dedicated support</p>
                                 <Button className="w-full mt-4" variant="outline">Contact Us</Button>
                             </CardContent>
                         </Card>
                     </div>
                 </div>
              </TabsContent>
              <TabsContent value="faq">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle>What file types are supported?</CardTitle></CardHeader>
                            <CardContent><p>Currently, we only support PDF files. We are working on adding support for EPUB and other formats soon.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Is my data secure?</CardTitle></CardHeader>
                            <CardContent><p>Yes, we take data privacy seriously. Your uploaded documents are processed securely and are not used for training our AI models without your explicit consent.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Can I use this on my mobile device?</CardTitle></CardHeader>
                            <CardContent><p>Absolutely! The Intelligent Book reader is fully responsive and works beautifully on desktops, tablets, and mobile phones.</p></CardContent>
                        </Card>
                    </div>
                </div>
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

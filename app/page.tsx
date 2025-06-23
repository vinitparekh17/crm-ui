import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, BarChart3, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="text-white h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">ACTOSOFT</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
          </div>

          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-8 bg-blue-100 text-blue-800 border-blue-200">
            Trusted by 500+ businesses worldwide
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 max-w-5xl">
            Empowering Teams to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Manage, Track and Resolve
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Your comprehensive complaint management dashboard. Real-time tracking, engineer assignments, and powerful
            analytics for efficient customer support operations.
          </p>

          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="flex justify-center px-6 pb-20 overflow-visible">
          <div className="relative max-w-6xl w-full">
            {/* Spotlight Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,225,255,0.3)_0%,_transparent_70%)] blur-2xl scale-x-[1.4] scale-y-[1.2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/5 to-transparent mix-blend-screen rounded-3xl" />
            </div>

            {/* 3D Card Container */}
            <div className="relative z-10 transform-gpu perspective-1000 rotate-x-2">
              <div className="bg-white bg-[radial-gradient(circle_at_top_center,_rgba(255,255,255,0.7)_0%,_rgba(255,255,255,0.3)_50%,_transparent_100%)] backdrop-blur-xl border border-gray-200 rounded-2xl p-2 shadow-[0_35px_50px_-15px_rgba(0,0,0,0.15)] shadow-blue-100/30 transition-transform duration-300 hover:scale-[1.01]">
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-inner shadow-white/10">
                  <Image
                    width={1200}
                    height={800}
                    src="/images/dashboard-preview.png"
                    alt="ACTOSOFT Dashboard Preview"
                    className="w-full h-auto object-cover relative z-10"
                  />
                </div>
              </div>

              {/* Colored 3D Shadow Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-400/30 rounded-2xl transform translate-y-6 translate-x-6 scale-[1.05] -z-10 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-2xl transform translate-y-12 translate-x-12 scale-[1.08] -z-20 blur-2xl" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="px-6 py-20 bg-blue-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to manage complaints
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Streamline your support operations with powerful tools designed for modern teams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
                <p className="text-gray-600">
                  Track complaint trends, resolution times, and team performance with live dashboards
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600">
                  Assign tasks, monitor workloads, and optimize your support team&apos;s efficiency
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with 99.9% uptime guarantee for your critical operations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your support operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of teams already using ACTOSOFT to deliver exceptional customer support
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-gray-900">ACTOSOFT</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 ACTOSOFT. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">TaskMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-gray-700 hover:text-primary-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Manage Your Tasks{' '}
              <span className="text-primary-600">Efficiently</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              A powerful task management system with role-based access control,
              real-time updates, and beautiful UI. Built for productivity.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => router.push('/register')}
                className="group px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-xl hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition shadow-lg border-2 border-primary-100"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-32 grid md:grid-cols-3 gap-8 animate-slide-up">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Built with Next.js and optimized for speed. Experience blazing
                fast performance with Redis caching.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                JWT authentication, role-based access control, and enterprise-grade
                security features to keep your data safe.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Intuitive interface with beautiful design. Manage tasks, track
                progress, and collaborate with your team effortlessly.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white shadow-2xl animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">
              Ready to boost your productivity?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of users who manage their tasks efficiently with TaskMaster
            </p>
            <button
              onClick={() => router.push('/register')}
              className="px-10 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition shadow-xl font-semibold text-lg"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold">TaskMaster</span>
          </div>
          <p className="text-gray-400">
            © 2025 TaskMaster. Built for Backend Developer Intern Assignment.
          </p>
        </div>
      </footer>
    </div>
  );
}

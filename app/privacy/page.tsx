import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Haddu Clothing",
  description: "Learn how Haddu Clothing collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#152312',
        color: 'white',
        padding: '60px 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '150px', height: '150px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
          Legal
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
          How we protect your information
        </p>
      </div>

      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Information We Collect</h2>
              <p className="mb-4">
                When you visit our website or make a purchase, we collect certain information about you, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information (name, email address, phone number, shipping address)</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to your questions and requests</li>
                <li>Improve our products and services</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with trusted
                third-party service providers who assist us in operating our business, such as payment
                processors and shipping carriers. These providers are bound by confidentiality agreements
                and are only permitted to use your information for the specific services they provide to us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction. All payment transactions
                are encrypted using SSL technology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience, analyze site traffic,
                and remember your preferences. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or want to exercise your rights,
                please contact us at{" "}
                <a href="mailto:support@hadduclothing.com" className="text-gray-900 underline">
                  support@hadduclothing.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

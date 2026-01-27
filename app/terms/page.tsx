import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Haddu Clothing",
  description: "Read the terms and conditions for using Haddu Clothing's website and services.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
          Our terms and conditions
        </p>
      </div>

      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using the Haddu Clothing website, you agree to be bound by these Terms
                of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Products and Pricing</h2>
              <p className="mb-4">
                All product descriptions, images, and prices are subject to change without notice.
                We strive to display accurate colors and details, but we cannot guarantee that your
                device's display will accurately reflect the actual product colors.
              </p>
              <p>
                Prices are displayed in Indian Rupees (INR) and include applicable taxes unless
                otherwise stated. We reserve the right to correct any pricing errors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Orders and Payment</h2>
              <p className="mb-4">
                When you place an order, you are making an offer to purchase. We reserve the right
                to accept or decline your order for any reason, including product availability,
                pricing errors, or suspected fraud.
              </p>
              <p>
                Payment must be made at the time of order. We accept major credit cards, debit cards,
                and UPI payments through our secure payment processors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Shipping and Delivery</h2>
              <p className="mb-4">
                We aim to process and ship orders within 2-3 business days. Delivery times vary
                depending on your location and the shipping method selected. Free shipping is
                available on orders above ₹999.
              </p>
              <p>
                Risk of loss and title for items pass to you upon delivery of the items to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Returns and Exchanges</h2>
              <p className="mb-4">
                We want you to be completely satisfied with your purchase. If you are not satisfied,
                you may return unworn, unwashed items with original tags within 7 days of delivery
                for a refund or exchange.
              </p>
              <p>
                To initiate a return, please contact our customer service team. Refunds will be
                processed to the original payment method within 5-7 business days of receiving
                the returned item.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and designs, is the
                property of Haddu Clothing and is protected by copyright and trademark laws.
                You may not use, reproduce, or distribute our content without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">User Conduct</h2>
              <p className="mb-4">When using our website, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Haddu Clothing shall not be liable for any
                indirect, incidental, special, or consequential damages arising from your use of
                our website or products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Changes will be posted on
                this page with an updated revision date. Your continued use of the website after
                any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at{" "}
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

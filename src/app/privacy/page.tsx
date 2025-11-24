import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
                    <h1>Privacy Policy</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2>1. Introduction</h2>
                    <p>
                        Batch Sourcing ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                        how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>

                    <h2>2. Information We Collect</h2>

                    <h3>2.1 Information You Provide</h3>
                    <p>We collect information that you provide directly to us, including:</p>
                    <ul>
                        <li>Account information (name, email, password, company details)</li>
                        <li>RFI submissions (product requirements, specifications, documents)</li>
                        <li>Communications with us and other users</li>
                        <li>Payment information (processed by third-party payment processors)</li>
                    </ul>

                    <h3>2.2 Automatically Collected Information</h3>
                    <p>When you use our Service, we automatically collect:</p>
                    <ul>
                        <li>Log data (IP address, browser type, pages visited, time spent)</li>
                        <li>Device information (device type, operating system)</li>
                        <li>Cookies and similar tracking technologies</li>
                        <li>Usage data (features used, actions taken)</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li>Provide, maintain, and improve our Service</li>
                        <li>Process your RFI submissions and match you with suppliers</li>
                        <li>Communicate with you about your account and our services</li>
                        <li>Send you marketing communications (with your consent)</li>
                        <li>Detect, prevent, and address technical issues and fraud</li>
                        <li>Comply with legal obligations</li>
                        <li>Analyze usage patterns and improve user experience</li>
                    </ul>

                    <h2>4. Cookies and Tracking Technologies</h2>
                    <p>We use cookies and similar tracking technologies to:</p>
                    <ul>
                        <li><strong>Essential Cookies:</strong> Required for the Service to function (authentication, security)</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
                        <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                    </ul>
                    <p>
                        You can control cookie preferences through our cookie banner or your browser settings. Note that disabling
                        certain cookies may limit your ability to use some features of the Service.
                    </p>

                    <h2>5. How We Share Your Information</h2>
                    <p>We may share your information with:</p>
                    <ul>
                        <li><strong>Suppliers:</strong> When you submit an RFI, we share relevant information with matched suppliers</li>
                        <li><strong>Service Providers:</strong> Third parties who perform services on our behalf (hosting, analytics, payment processing)</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    </ul>
                    <p>We do not sell your personal information to third parties.</p>

                    <h2>6. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your information. However, no
                        method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2>7. Data Retention</h2>
                    <p>
                        We retain your information for as long as necessary to provide the Service and fulfill the purposes outlined
                        in this Privacy Policy, unless a longer retention period is required by law.
                    </p>

                    <h2>8. Your Rights (GDPR)</h2>
                    <p>If you are in the European Economic Area, you have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Rectify inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to processing of your data</li>
                        <li>Request data portability</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us at{" "}
                        <a href="mailto:privacy@batchsourcing.com">privacy@batchsourcing.com</a>.
                    </p>

                    <h2>9. Children's Privacy</h2>
                    <p>
                        Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
                        information from children under 13.
                    </p>

                    <h2>10. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and processed in countries other than your own. We ensure appropriate
                        safeguards are in place to protect your information in accordance with this Privacy Policy.
                    </p>

                    <h2>11. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
                        the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>

                    <h2>12. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:privacy@batchsourcing.com">privacy@batchsourcing.com</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

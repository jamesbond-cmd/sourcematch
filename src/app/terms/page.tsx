import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
                    <h1>Terms of Service</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Batch Sourcing ("the Service"), you accept and agree to be bound by the terms
                        and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                    </p>

                    <h2>2. Description of Service</h2>
                    <p>
                        Batch Sourcing provides a platform that connects food and beverage buyers with manufacturers. We facilitate
                        the submission of Requests for Information (RFIs) and use AI technology to match buyers with suitable suppliers.
                    </p>

                    <h2>3. User Accounts</h2>
                    <p>
                        To access certain features of the Service, you must register for an account. You agree to:
                    </p>
                    <ul>
                        <li>Provide accurate, current, and complete information during registration</li>
                        <li>Maintain and promptly update your account information</li>
                        <li>Maintain the security of your password and account</li>
                        <li>Accept responsibility for all activities that occur under your account</li>
                        <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>

                    <h2>4. User Conduct</h2>
                    <p>You agree not to:</p>
                    <ul>
                        <li>Use the Service for any illegal purpose or in violation of any laws</li>
                        <li>Post false, inaccurate, misleading, or fraudulent information</li>
                        <li>Impersonate any person or entity</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Attempt to gain unauthorized access to any portion of the Service</li>
                        <li>Use automated systems to access the Service without our permission</li>
                    </ul>

                    <h2>5. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are owned by Batch Sourcing and are
                        protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>

                    <h2>6. User Content</h2>
                    <p>
                        You retain ownership of any content you submit to the Service. By submitting content, you grant us a
                        worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content
                        in connection with operating and providing the Service.
                    </p>

                    <h2>7. Third-Party Services</h2>
                    <p>
                        The Service may contain links to third-party websites or services that are not owned or controlled by
                        Batch Sourcing. We have no control over and assume no responsibility for the content, privacy policies,
                        or practices of any third-party websites or services.
                    </p>

                    <h2>8. Disclaimer of Warranties</h2>
                    <p>
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                        WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                    </p>

                    <h2>9. Limitation of Liability</h2>
                    <p>
                        IN NO EVENT SHALL BATCH SOURCING BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                        DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE.
                    </p>

                    <h2>10. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold harmless Batch Sourcing and its officers, directors, employees, and agents
                        from any claims, damages, losses, liabilities, and expenses arising out of your use of the Service or
                        violation of these Terms.
                    </p>

                    <h2>11. Termination</h2>
                    <p>
                        We may terminate or suspend your account and access to the Service immediately, without prior notice or
                        liability, for any reason, including breach of these Terms.
                    </p>

                    <h2>12. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. We will notify users of any material changes by
                        posting the new Terms on this page and updating the "Last updated" date.
                    </p>

                    <h2>13. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of the United States, without
                        regard to its conflict of law provisions.
                    </p>

                    <h2>14. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at{" "}
                        <a href="mailto:legal@batchsourcing.com">legal@batchsourcing.com</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

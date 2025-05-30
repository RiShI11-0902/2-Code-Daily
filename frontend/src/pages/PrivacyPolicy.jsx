import { LegalPage } from "../components/LegalPage";

export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p>We respect your privacy. This policy explains how we handle your data when using our extension or website.</p>
    
    <p><strong>1. Data Collected:</strong> We collect your email address, name, and optional contact number. We also store your mock interview progress locally in your browser using Chrome storage.</p>
    
    <p><strong>2. Purpose:</strong> We use the collected information to generate AI-powered mock interviews, provide personalized updates, and offer support when needed. Your session progress is saved locally to improve your user experience.</p>
    
    <p><strong>3. Permissions:</strong> Our extension requests permission to access <code>https://leetcode.com/*</code> in order to simulate mock interviews directly on the LeetCode platform. It also uses <code>storage</code> permission to save your progress.</p>
    
    <p><strong>4. Security:</strong> Your data is securely stored. We do not sell, rent, or share your information with any third parties. No third-party analytics or advertising services are used.</p>
    
    <p><strong>5. LeetCode Disclaimer:</strong> We do not access, collect, or store any personal data from your LeetCode account. We only enhance your experience by simulating mock interviews on the LeetCode platform.</p>
    
    <p><strong>6. Changes to this Policy:</strong> We may update this Privacy Policy in the future. Any changes will be posted inside the extension or on our official website.</p>
    
    <p><strong>7. Contact Us:</strong> If you have any questions regarding this Privacy Policy, please contact us at <strong>support@2codedaily.com</strong>.</p>
  </LegalPage>
);

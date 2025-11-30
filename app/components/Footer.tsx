import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-neutral-900 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-10 px-4">
          {/* Contact Us Section */}
          <div>
            <h4 className="font-bold mb-4">CONTACT US</h4>
            <p>Professional Equipment Solutions</p>
            <p className="mt-2">888 555 EQUIP (3784)</p>
            <p className="mt-2">support@equipmentstore.com</p>
            <p className="mt-2">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
          </div>

          {/* Information Section */}
          <div>
            <h4 className="font-bold mb-4">INFORMATION</h4>
            <ul>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Case Studies</li>
              <li className="mb-2">Terms & Conditions</li>
              <li className="mb-2">Shipping Information</li>
              <li className="mb-2">Product Warranties</li>
              <li className="mb-2">Technical Support</li>
            </ul>
          </div>

          {/* My Account Section */}
          <div>
            <h4 className="font-bold mb-4">CUSTOMER SERVICE</h4>
            <ul>
              <li className="mb-2">Contact Us</li>
              <li className="mb-2">Order Tracking</li>
              <li className="mb-2">Returns & Exchanges</li>
              <li className="mb-2">Supplier Information</li>
              <li className="mb-2">Bulk Orders</li>
              <li className="mb-2">Product Support</li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="font-bold mb-4">EQUIPMENT</h4>
            <ul>
              <li className="mb-2">Bulldozers & Crawlers</li>
              <li className="mb-2">Drilling Rigs</li>
              <li className="mb-2">Crushers & Pavers</li>
              <li className="mb-2">Motor Graders</li>
              <li className="mb-2">Power Generation</li>
              <li className="mb-2">All Equipment</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 bg-neutral-950 py-6 px-4">
          <div className="container mx-auto">
            {/* Social Media and Newsletter */}
            <div className="flex justify-between space-x-4 items-center">
              <div>
                {/* Placeholder for payment logo if it doesn't exist */}
                <span className="text-sm text-gray-400">Secure Payments</span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">Professional Equipment Store © 2025. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

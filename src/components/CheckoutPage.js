import React from "react";
import { Link } from "react-router-dom";
import "../Style Folder/CheckoutPage.css"; // Add custom styles for the page

const CheckoutPage = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "PayPal",
      image: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
      link: "https://www.paypal.com/",
    },
    {
      id: 2,
      name: "Credit/Debit Card",
      image: "https://www.livemint.com/lm-img/img/2024/10/18/600x338/2-0-117167611-credit-cards-1-0_1681880187837_1729249625448.jpg",
      link: "https://www.visa.com/",
    },
    {
      id: 3,
      name: "Google Pay",
      image: "https://thedailyguardian.com/wp-content/uploads/2024/01/gpay.jpg",
      link: "https://pay.google.com/",
    },
    {
      id: 4,
      name: "Apple Pay",
      image: "https://download.logo.wine/logo/Apple_Pay/Apple_Pay-Logo.wine.png",
      link: "https://www.apple.com/apple-pay/",
    },
  ];

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p>Select your preferred payment method:</p>
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <div key={method.id} className="payment-method">
            <a href={method.link} target="_blank" rel="noopener noreferrer">
              <img src={method.image} alt={method.name} />
              <p>{method.name}</p>
            </a>
          </div>
        ))}
      </div>
      <Link to="/shopingcardpage" className="btn btn-secondary">
        Back to Shoping Card
      </Link>
    </div>
  );
};

export default CheckoutPage;

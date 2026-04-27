import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-light py-5 mt-auto">
            <div className="container">
                <div className="row g-4">
                    {/* Brand Section */}
                    <div className="col-lg-4 col-md-6">
                        <h3 className="text-warning mb-3">FoodDelivery</h3>
                        <p className="text-secondary">
                            Satisfy your cravings with our quick and reliable food delivery service. 
                            Fresh, hot, and delicious meals right to your doorstep.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-light fs-5"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><Link to="/" className="text-decoration-none text-secondary custom-hover-link">Home</Link></li>
                            <li><Link to="/menu" className="text-decoration-none text-secondary custom-hover-link">Menu</Link></li>
                            <li><Link to="/about" className="text-decoration-none text-secondary custom-hover-link">About Us</Link></li>
                            <li><Link to="/contact" className="text-decoration-none text-secondary custom-hover-link">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div className="col-lg-4 col-md-12">
                        <h5 className="mb-3">Contact Us</h5>
                        <ul className="list-unstyled text-secondary d-flex flex-column gap-2">
                            <li><i className="bi bi-geo-alt-fill me-2 text-warning"></i> Silicon University, Patia ,Bhubaneswar,India 751024</li>
                            <li><i className="bi bi-telephone-fill me-2 text-warning"></i> +91 7325842055</li>
                            <li><i className="bi bi-envelope-fill me-2 text-warning"></i> support@fooddelivery.com</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-4 border-secondary" />

                {/* Copyright */}
                <div className="text-center text-secondary">
                    <small>&copy; {new Date().getFullYear()} FoodDelivery. All rights reserved.</small>
                </div>
            </div>
            
            <style>{`
                .custom-hover-link:hover {
                    color: #ffc107 !important; /* Bootstrap warning color */
                    transition: color 0.3s ease;
                }
            `}</style>
        </footer>
    );
}

export default Footer;
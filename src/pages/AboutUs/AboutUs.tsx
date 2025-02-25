import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          About RideRevolt
        </h1>
        <p className="text-lg dark:text-white text-justify mb-12">
          Welcome to{' '}
          <span className="font-semibold text-amber-500">RideRevolt</span> –
          your ultimate destination for premium bikes. We are dedicated to
          providing you with the best selection of high-quality bikes that cater
          to every rider's needs, whether you're a city commuter, an adventure
          seeker, or a speed enthusiast.
        </p>

        <div className="space-y-8">
          {/* Our Mission */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="dark:text-white text-justify">
              At RideRevolt, our mission is to make your biking dreams come
              true. We strive to offer a curated collection of bikes that
              combine performance, style, and reliability. From sleek city bikes
              to rugged off-road models, we ensure every bike meets the highest
              standards of quality and innovation.
            </p>
          </section>

          {/* Our Story */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="dark:text-white text-justify">
              RideRevolt was founded by a group of biking enthusiasts who wanted
              to create a platform where riders could find the perfect bike for
              their lifestyle. What started as a small online store has now
              grown into a trusted name in the biking community. Our journey has
              been fueled by our passion for bikes and our commitment to
              delivering exceptional customer experiences.
            </p>
          </section>

          {/* Why Choose Us? */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Why Choose RideRevolt?
            </h2>
            <ul className="list-disc list-inside dark:text-white space-y-3 text-justify">
              <li>
                <span className="font-semibold">Wide Selection:</span> We offer
                a diverse range of bikes, from urban commuters to
                high-performance sports bikes, ensuring there's something for
                everyone.
              </li>
              <li>
                <span className="font-semibold">Quality Assurance:</span> Every
                bike in our collection is carefully selected and tested to meet
                the highest standards of durability and performance.
              </li>
              <li>
                <span className="font-semibold">Affordable Prices:</span> We
                believe that everyone deserves a great bike, which is why we
                offer competitive pricing without compromising on quality.
              </li>
              <li>
                <span className="font-semibold">
                  Customer-Centric Approach:
                </span>{' '}
                Your satisfaction is our priority. From seamless online shopping
                to reliable after-sales support, we’re here for you every step
                of the way.
              </li>
            </ul>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p className="dark:text-white text-justify">
              At RideRevolt, we are guided by three core principles:
            </p>
            <ul className="list-disc list-inside dark:text-white space-y-3 mt-3 text-justify">
              <li>
                <span className="font-semibold">Quality:</span> We are committed
                to offering only the best bikes that meet rigorous quality
                standards.
              </li>
              <li>
                <span className="font-semibold">Customer Satisfaction:</span>{' '}
                Your happiness is our success. We go the extra mile to ensure
                you have a great experience with us.
              </li>
              <li>
                <span className="font-semibold">Passion for Biking:</span> We
                share your love for biking and are dedicated to helping you find
                the perfect ride.
              </li>
            </ul>
          </section>

          {/* Join the Revolution */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Find Your Perfect Bike
            </h2>
            <p className="dark:text-white text-justify">
              Whether you're looking for a bike to navigate the city streets or
              one to conquer rugged terrains, RideRevolt has you covered.
              Explore our collection, discover your next ride, and join a
              community of passionate bikers.
            </p>
            <p className="dark:text-white mt-4">
              Ready to find your dream bike?{' '}
              <Link
                to="/all-products"
                className="text-amber-500 font-semibold hover:underline"
              >
                Browse our bikes
              </Link>{' '}
              or{' '}
              <Link
                to="/"
                className="text-amber-500 font-semibold hover:underline"
              >
                get in touch
              </Link>{' '}
              to learn more.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

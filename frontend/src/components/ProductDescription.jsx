import React, { useState } from "react";

const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState("description"); // Track the active tab

  return (
    <div className="ring-1 ring-slate-900/10 rounded-lg bg-primary">
      {/* Tab Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("description")}
          className={`p-3 w-32 ${
            activeTab === "description"
              ? "border-b-2 border-secondary text-secondary font-extrabold"
              : ""
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("care")}
          className={`p-3 w-32 ${
            activeTab === "care"
              ? "border-b-2 border-secondary text-secondary font-extrabold"
              : ""
          }`}
        >
          Care Guide
        </button>
        <button
          onClick={() => setActiveTab("color")}
          className={`p-3 w-32 ${
            activeTab === "color"
              ? "border-b-2 border-secondary text-secondary font-extrabold"
              : ""
          }`}
        >
          Color Guide
        </button>
      </div>

      {/* Tab Content */}
      <hr className="h-[1px] w-full" />
      <div className="flex flex-col gap-3 p-3">
        {/* Product Description */}
        {activeTab === "description" && (
          <div>
            <div>
              <h5 className="h5">Detail</h5>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                non molestias ipsum earum hic accusantium quia distinctio
                nesciunt cum quos assumenda numquam at eaque corrupti esse nobis
                libero soluta. Fugit quos possimus cumque ea inventore, aperiam
                debitis illo adipisci mollitia facere est minima nisi ut aliquam
                veniam eos excepturi odit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, similique natus laborum asperiores laudantium
                quis?
              </p>
            </div>
            <div className="mt-3">
              <h5 className="h5">Benefit</h5>
              <ul className="list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1">
                <li>
                  High-quality materials ensure long-lasting durability and
                  comfort.
                </li>
                <li>
                  Designed to meet the needs of modern, active lifestyles.
                </li>
                <li>Available in a wide range of colors and trendy colors.</li>
              </ul>
            </div>
          </div>
        )}
        {/* Care */}
        {activeTab === "care" && (
          <div>
          <h2 className="h4">Electronics Care Guide: How to Maintain Your Gadgets</h2>
          <p className="text-sm">Taking care of your electronics is crucial to ensure their longevity and optimal performance. Here are some essential care tips to help you maintain your gadgets in top condition:</p>
          <hr className="my-3"/>
          <h3 className="h4">1. Keep Your Devices Clean</h3>
          <ul>
            <li><strong>Regularly wipe down your gadgets</strong> with a microfiber cloth to remove dust, fingerprints, and smudges. For screens, use a screen-safe cleaner.</li>
            <li>Avoid using household cleaners or paper towels, as they can damage screens or surfaces.</li>
            <li><strong>Keyboards and ports</strong>: Use compressed air to clear dust and debris from keyboards and ports (like USB, charging ports, and headphone jacks).</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">2. Protect from Extreme Temperatures</h3>
          <ul>
            <li><strong>Avoid extreme heat and cold</strong>: Electronics are sensitive to temperature changes. Never leave devices in a hot car or in direct sunlight for long periods.</li>
            <li><strong>Storage</strong>: Keep devices in cool, dry places, and avoid placing them on heating vents or near sources of moisture.</li>
            <li><strong>Laptop cooling</strong>: If you're using a laptop or gaming device, make sure to place it on a hard, flat surface to help dissipate heat.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">3. Use Screen Protectors and Cases</h3>
          <ul>
            <li><strong>Screen protectors</strong>: For smartphones, tablets, and other portable devices, always consider using a screen protector to prevent scratches and cracks.</li>
            <li><strong>Phone cases and laptop sleeves</strong>: Invest in protective cases for phones and sleeves for laptops to minimize damage from accidental drops or bumps.</li>
            <li><strong>Keyboard covers</strong>: For devices like laptops, using keyboard covers can protect from dust and spills.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">4. Battery Care</h3>
          <ul>
            <li><strong>Avoid full discharges</strong>: Lithium-ion batteries (common in smartphones, laptops, and tablets) should not be fully discharged regularly. Try to keep the battery level between 20% to 80%.</li>
            <li><strong>Avoid overcharging</strong>: Unplug your device once it reaches 100% to prevent unnecessary stress on the battery. Some modern devices have systems that prevent overcharging, but it's still good practice to unplug when possible.</li>
            <li><strong>Store with care</strong>: If you're not using a device for an extended period, store it with around 50% battery life to preserve battery health.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">5. Avoid Water and Moisture Exposure</h3>
          <ul>
            <li><strong>Waterproof gadgets</strong>: Even if your gadget claims to be waterproof, avoid unnecessary exposure to water (e.g., don’t drop your phone in the pool).</li>
            <li><strong>Dry thoroughly</strong>: If your device gets wet, dry it off immediately with a microfiber cloth. For devices that are not waterproof, try placing them in a bag of rice or silica gel packs to absorb moisture.</li>
            <li><strong>Use moisture-resistant cases</strong>: For devices that might get wet (like headphones, portable speakers, or smartwatches), using a water-resistant case is a good idea.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">6. Use Proper Charging Equipment</h3>
          <ul>
            <li><strong>Use the original charger</strong>: Always use the charger that came with your device or a manufacturer-approved replacement. Generic chargers may damage your device or battery.</li>
            <li><strong>Avoid charging in extreme conditions</strong>: Don't charge your gadgets in hot or cold environments. Charging in such conditions can reduce battery life or even cause damage.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">7. Keep Software and Firmware Up-to-Date</h3>
          <ul>
            <li><strong>Install updates</strong>: Regularly update your devices’ software and firmware. Updates often include security patches, bug fixes, and performance improvements.</li>
            <li><strong>Avoid outdated apps</strong>: Keep your apps up to date to prevent compatibility issues and improve device performance.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">8. Backup Your Data</h3>
          <ul>
            <li><strong>Use cloud storage</strong>: Regularly back up important data from your devices to the cloud or an external storage device (hard drives or USB drives) to avoid data loss.</li>
            <li><strong>Automatic backups</strong>: Enable automatic backups for your smartphone, tablet, or computer so you don’t forget to do it manually.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">9. Handle with Care</h3>
          <ul>
            <li><strong>Avoid dropping</strong>: Always handle your gadgets with care, and avoid dropping them. Keep them in a secure place when not in use.</li>
            <li><strong>Be mindful of the weight</strong>: Some devices like laptops and cameras have moving parts (hard drives or lens) that can be damaged by rough handling or sudden drops.</li>
            <li><strong>Travel cases</strong>: If traveling, use a protective case or sleeve to shield your devices from bumps, scratches, and impacts.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">10. Keep Gadgets Away from Magnets</h3>
          <ul>
            <li><strong>Avoid magnetic fields</strong>: Strong magnetic fields (from magnets, speakers, etc.) can damage internal components such as the hard drive or sensors. Keep your devices away from magnets and large speakers.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">11. Ensure Proper Ventilation</h3>
          <ul>
            <li><strong>Don't block vents</strong>: Devices like laptops, gaming consoles, and routers have air vents to cool internal components. Always ensure these vents are not blocked by placing your device on soft surfaces like beds or couches.</li>
            <li><strong>Use cooling pads</strong>: For laptops or gaming systems, consider using a cooling pad to help manage heat during extended usage.</li>
          </ul>
          <hr className="my-3"/>
          <h3 className="h4">12. Handling Accessories</h3>
          <ul>
            <li><strong>Clean headphones regularly</strong>: For earphones and headphones, wipe the ear pads with a damp cloth and clean the mesh parts with a small brush to remove earwax buildup.</li>
            <li><strong>Cable management</strong>: Don’t yank or bend charging cables and cords. Store them neatly to prevent fraying and damage.</li>
            <li><strong>Protect charging ports</strong>: Avoid frequent plugging/unplugging of charging cables. Always check the cable is correctly aligned before connecting it to avoid damage to the charging port.</li>
          </ul>
          <hr className="my-3"/>
          <h2>Conclusion</h2>
          <p>By following these simple care guidelines, you can help ensure that your electronics remain in excellent working condition for years to come. Regular maintenance and mindful handling can go a long way in prolonging the lifespan of your gadgets.</p>
        </div>
        )}
        {/* Color guide */}
        {activeTab === "color" && (
          <div className="color-guide">
          <h2 className="h4">Color Guide for Electronics Gadgets</h2>
          <hr className="my-3"/>
          <div className="color-item">
            <h3 className="h5 bg-amber-500 bg-opacity-50 px-3 rounded-md inline text-red-600">Red</h3>
            <p className="text-black py-1">
              Red is bold, energetic, and attention-grabbing. Perfect for gaming devices or gadgets meant to stand out. It symbolizes passion and excitement, ideal for active lifestyles.
            </p>
            <ul>
              <li>Best for: Gaming devices, bold designs</li>
              <li>Examples: Gaming laptops, Xbox controllers, Beats headphones</li>
            </ul>
          </div>
          <hr className="my-3"/>
          <div className="color-item">
            <h3 className="h5 bg-amber-500 bg-opacity-50 px-3 rounded-md inline text-white">White</h3>
            <p className="text-black py-1">
              White signifies cleanliness, simplicity, and minimalism. It’s often used for sleek and modern designs, providing a fresh and polished look.
            </p>
            <ul>
              <li>Best for: Modern, minimalist gadgets</li>
              <li>Examples: Apple MacBooks, smart speakers</li>
            </ul>
          </div>
          <hr className="my-3"/>
          <div className="color-item">
            <h3 className="h5 bg-amber-500 bg-opacity-50 px-3 rounded-md inline">Black</h3>
            <p className="text-black py-1">
              Black is classic, sleek, and professional. It’s a versatile color that works well for premium gadgets, offering a sophisticated, timeless aesthetic.
            </p>
            <ul>
              <li>Best for: High-end gadgets, professional settings</li>
              <li>Examples: iPhones, MacBooks, Bose headphones</li>
            </ul>
          </div>
          <hr className="my-3"/>
          <div className="color-item">
            <h3 className="h5 bg-amber-500 bg-opacity-50 px-3 rounded-md inline text-blue-600">Blue</h3>
            <p className="text-black py-1">
              Blue is calming, reliable, and cool. It’s a popular color for gadgets designed for both everyday use and outdoor activities, giving a tech-savvy feel.
            </p>
            <ul>
              <li>Best for: Smartphones, fitness trackers, outdoor tech</li>
              <li>Examples: Samsung Galaxy phones, smartwatches, Bluetooth speakers</li>
            </ul>
          </div>
        </div>        
        )}
      </div>
    </div>
  );
};

export default ProductDescription;

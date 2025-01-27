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
              ? "border-b-2 border-secondary text-secondary"
              : ""
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("care")}
          className={`p-3 w-32 ${
            activeTab === "care"
              ? "border-b-2 border-secondary text-secondary"
              : ""
          }`}
        >
          Care Guide
        </button>
        <button
          onClick={() => setActiveTab("color")}
          className={`p-3 w-32 ${
            activeTab === "color"
              ? "border-b-2 border-secondary text-secondary"
              : ""
          }`}
        >
          Color Guide
        </button>
      </div>

      {/* Tab Content */}
      <hr className="h-[1px] w-full" />
      <div className="flex flex-col gap-3 p-3">
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
        {activeTab === "care" && (
          <div>
            <h5 className="h5">Care Guide</h5>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              tempor orci non risus tincidunt, ac vulputate augue vehicula.
            </p>
          </div>
        )}
        {activeTab === "color" && (
          <div>
            <h5 className="h5">Color Guide</h5>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              accumsan elit at nulla vestibulum, ac dictum nulla mollis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;

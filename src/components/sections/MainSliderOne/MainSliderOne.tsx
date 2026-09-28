"use client";

import { useEffect, useState } from "react";
import { mainSliderOneData } from "@/data/mainSliderOneData";
import Image, { StaticImageData } from "next/image";
import TextAnimation from "@/components/common/AnimatedText/TextAnimation";
import dynamic from "next/dynamic";
import BannerForm from "../BannerForm/BannerForm";

const TinySlider = dynamic(() => import("tiny-slider-react"), {
  ssr: false,
});

export interface MainSliderOneDataType {
  title: string;
  subtitle: string;
  hoverImage: StaticImageData;
  description: string;
  destinations: DestinationItem[];
  formFields: FormField[];
  images: ImageItem[];
}

interface DestinationItem {
  id: number;
  image: StaticImageData;
}

interface FormField {
  id: number;
  name: string;
  label: string;
  icon: string;
  type: "select" | "text" | "number";
  placeholder?: string;
  value?: number;
  options?: FormFieldOption[];
}

interface FormFieldOption {
  id: number;
  value: string;
  label: string;
}

interface ImageItem {
  id: number;
  class: string;
  image: StaticImageData;
}

const MainSliderOne: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const settings = {
    loop: true,
    autoplay: true,
    items: 3,
    gutter: 40,
    mouseDrag: true,
    preventScrollOnTouch: "auto",
    nav: false,
    autoplayButtonOutput: false,
    controls: true,
    controlsContainer: ".main-slider-one__bottom__nav",
    autoplayTimeout: 6000,
    speed: 1000,
  };

  return (
    <section className="main-slider-one" id="home">
      <div className="main-slider-one__item">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-10">
              <div className="main-slider-one__content">
                <h5 className="main-slider-one__sub-title main-three bw-split-in-top">
                  {mainSliderOneData.subtitle}
                </h5>

                <h2 className="main-slider-one__title main-three bw-split-in-down">
                  <TextAnimation
                    text="Next Step"
                    animationType="down"
                  />
                </h2>

                <h2 className="main-slider-one__title main-three bw-split-in-down">
                  <TextAnimation
                    text="Destination"
                    animationType="down"
                  />
                </h2>

                <p className="main-slider-one__text main-three bw-split-in-down">
                  {mainSliderOneData.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations */}
        <div className="main-slider-one__destinations">
          <div className="container">
            <div className="destinations-two__inner gotur-owl__carousel--with-shadow">
              {mounted && (
                <TinySlider
                  settings={settings}
                  className="main-slider-one__carousel"
                >
                  {mainSliderOneData?.destinations?.map(
                    (dest: DestinationItem) => (
                      <div className="item" key={dest.id}>
                        <div className="destinations-card-two wow fadeInUp">
                          <div className="destinations-card-two__thumb">
                            <Image
                              src={dest.image}
                              alt="destination"
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </TinySlider>
              )}
            </div>
          </div>

          {/* Hover Image */}
          <div className="main-slider-one__destinations__hover">
            <Image
              src={mainSliderOneData.hoverImage}
              alt="hover image"
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="main-slider-one__bottom__nav">
          <button
            type="button"
            className="main-slider-one__carousel__nav--left"
            aria-label="Previous slide"
          >
            <span className="icon-arrow-left"></span>
          </button>

          <button
            type="button"
            className="main-slider-one__carousel__nav--right"
            aria-label="Next slide"
          >
            <span className="icon-arrow-right"></span>
          </button>
        </div>

        {/* Banner Form */}
        <div className="main-slider-one__action-form">
          <div className="container">
            <div className="main-slider-one__form">
              <BannerForm />
            </div>
          </div>
        </div>

        {/* Shape Images */}
        {mainSliderOneData?.images?.map((img: ImageItem) => (
          <div
            key={img.id}
            className={`main-slider-one__element${img.class}`}
          >
            <Image
              src={img.image}
              alt={`element ${img.class}`}
              loading="eager"
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
        ))}

        <div className="main-slider-one__element-four"></div>
      </div>
    </section>
  );
};

export default MainSliderOne;

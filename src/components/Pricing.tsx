"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"
import { useInView } from 'react-intersection-observer'

// Utility function to combine class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TextStaggerHoverProps {
  text: string
  index: number
}

interface HoverSliderImageProps {
  index: number
  imageUrl: string
}

interface HoverSliderProps {}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className || ""}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, children, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)
  
  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden cursor-pointer",
        className || ""
      )}
      {...props}
      ref={ref}
      onMouseEnter={handleMouse}
    >
      {characters.map((char, charIndex) => (
        <span
          key={`${char}-${charIndex}`}
          className="relative inline-block overflow-hidden"
        >
                                <MotionConfig
            transition={{
              delay: charIndex * 0.025,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <motion.span
              className="inline-block opacity-20"
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block opacity-100"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className || ""
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      src={imageUrl}
      className={cn("inline-block align-middle object-cover w-full h-full", className || "")}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"

// Content Component for showing package details
const HoverSliderContent: React.FC<{ packages: any[] }> = ({ packages }) => {
  const { activeSlide } = useHoverSliderContext()
  
  return (
    <div className="relative">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: activeSlide === index ? 1 : 0,
            x: activeSlide === index ? 0 : 20,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={activeSlide === index ? "block" : "absolute inset-0 pointer-events-none"}
        >
          <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-8 text-center">
            {pkg.price}
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-6">
            WHAT DO YOU GET?
          </h4>
          <ul className="space-y-2 lg:space-y-3 mb-4 lg:mb-8">
            {pkg.details.map((detail: string, detailIndex: number) => (
              <li key={detailIndex} className="flex items-start text-gray-300">
                <span className="text-white mr-2 lg:mr-3">•</span>
                <span className="text-sm lg:text-base leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
          
          <div className="border-t border-gray-600 pt-3 lg:pt-6 space-y-2 lg:space-y-3">
            <p className="text-xs lg:text-sm text-gray-400 italic">
              Studio rental not included in the price
            </p>
            <p className="text-xs lg:text-sm text-gray-400">
              The average studio price ranges from $50 to $100 per hour.
            </p>
            <p className="text-xs lg:text-sm text-gray-400">
              Booking of dates and times is confirmed upon a $100 advance payment.
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Main Pricing Component
export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const packages = [
    {
      name: "EXPRESS",
      price: "600$",
      details: [
        "1 hours of photo shoot",
        "Assistance in creating your look",
        "(recommendations and selection of outfits from your wardrobe, 1-2 looks per session)",
        "70-100 photos in color correction",
        "10 photos in detailed retouching (considering any specific requests you may have)",
        "Delivery within 10 days"
      ],
      image: "/IMG_7142.JPG"
    },
    {
      name: "STANDARD", 
      price: "800$",
      details: [
        "2 hours of photo shoot",
        "Assistance in creating your look",
        "(recommendations and selection of outfits from your wardrobe, 3-4 looks per session)",
        "150-200 photos in color correction",
        "20 photos in detailed retouching (considering any specific requests you may have)",
        "A 30-second video from the photo shoot",
        "Delivery within 10 days"
      ],
      image: "/IMG_7143.JPG"
    }
  ]

  return (
    <section 
      id="pricing"
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Section Header */}
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Pricing
          </h2>
        </motion.div>

        {/* Pricing Layout */}
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <HoverSlider className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Side - Package Names */}
            <div className="flex lg:flex-col lg:space-y-12 space-x-4 lg:space-x-0 justify-center lg:justify-start">
              {packages.map((pkg, index) => (
                <div key={pkg.name} className="text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-white">
                    <TextStaggerHover 
                      text={pkg.name} 
                      index={index}
                      className="block"
                    />
                  </h3>
                </div>
              ))}
            </div>

            {/* Right Side - Details and Images */}
            <div className="relative">
              {/* Image Container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
                <HoverSliderImageWrap>
                  {packages.map((pkg, index) => (
                    <HoverSliderImage
                      key={index}
                      index={index}
                      imageUrl={pkg.image}
                      alt={`${pkg.name} package`}
                    />
                  ))}
                </HoverSliderImageWrap>
              </div>

              {/* Content Container */}
              <div className="relative z-10 bg-black/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-12 border border-gray-700">
                <HoverSliderContent packages={packages} />
              </div>
            </div>
          </HoverSlider>
        </motion.div>
      </motion.div>
    </section>
  )
}

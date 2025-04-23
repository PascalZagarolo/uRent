"use client";

// Export only what we need from framer-motion
import { 
  motion as motionComponent, 
  AnimatePresence as AnimatePresenceComponent,
  useInView as useInViewHook,
  useMotionValue as useMotionValueHook,
  useSpring as useSpringHook,
  useScroll as useScrollHook,
  useMotionValueEvent as useMotionValueEventHook
} from "framer-motion";

// Re-export with named exports
export const motion = motionComponent;
export const AnimatePresence = AnimatePresenceComponent;
export const useInView = useInViewHook;
export const useMotionValue = useMotionValueHook;
export const useSpring = useSpringHook;
export const useScroll = useScrollHook;
export const useMotionValueEvent = useMotionValueEventHook; 
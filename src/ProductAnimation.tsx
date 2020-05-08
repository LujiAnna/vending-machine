import React from "react";
import { useSpring, animated, config } from "react-spring";

type ProductAnimationProps = {
  imageUrl: string;
  maxOffsetY: number;
  className?: string;
};

export default function ProductAnimation({
  imageUrl,
  maxOffsetY,
  className,
}: ProductAnimationProps) {
  const { t } = useSpring({
    config: { duration: 1500 },
    from: { t: [0, 1] },
    t: [maxOffsetY, 1.2],
  });

  return (
    <animated.div
      className={className}
      style={{
        backgroundImage: `url("${imageUrl}")`,
        transform: t.interpolate(
          (...params: any) => `translateY(${params[0]}px) scale(${params[1]})`
        ),
      }}
    />
  );
}

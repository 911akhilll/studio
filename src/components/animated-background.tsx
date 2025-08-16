"use client";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div className="relative h-full w-full bg-background">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(148,0,211,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(125,249,255,0.2),rgba(255,255,255,0))]"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;

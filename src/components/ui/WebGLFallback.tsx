import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Error caught by Boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <CSSGradientFallback />;
    }
    return this.props.children;
  }
}

export const CSSGradientFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden bg-[#070b16]">
      {/* High-end layered animated mesh gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse" />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-violet-600/15 blur-[160px] animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-sky-400/5 blur-[120px]" />

      {/* Cybernetic grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};

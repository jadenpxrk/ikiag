import { useEffect, useRef, useState } from "react";

import Initial from "@/components/initial";
import Response from "@/components/response";
import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";

const MemoizedInitial = memo(Initial);
const MemoizedResponse = memo(Response);

export default function Main() {
  const queryClient = useQueryClient();
  const [view, setView] = useState<"initial" | "response" | "followup">(
    "initial"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = window.electronAPI.onResetView(() => {
      queryClient.invalidateQueries({
        queryKey: ["screenshots"],
      });
      queryClient.invalidateQueries({
        queryKey: ["response"],
      });
      queryClient.invalidateQueries({
        queryKey: ["new_response"],
      });
      setView("initial");
    });

    return () => {
      cleanup();
    };
  }, []);

  // Dynamically update the window size
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const height = containerRef.current.scrollHeight;
      const width = containerRef.current.scrollWidth;
      window.electronAPI?.updateContentDimensions({ width, height });
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    // Also watch DOM changes
    const mutationObserver = new MutationObserver(updateDimensions);
    mutationObserver.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // Initial dimension update
    updateDimensions();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [view]);

  // Listen for events that might switch views or show errors
  useEffect(() => {
    const cleanupFunctions = [
      window.electronAPI.onResponseStart(() => {
        setView("response");
      }),
      window.electronAPI.onResetView(() => {
        queryClient.removeQueries({
          queryKey: ["screenshots"],
        });
        queryClient.removeQueries({
          queryKey: ["response"],
        });
        setView("initial");
      }),
    ];
    return () => cleanupFunctions.forEach((fn) => fn());
  }, [view]);

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      {/* min-h-screen to prevent weird overflow scroll bar on tooltip hover */}
      {view === "initial" ? (
        <MemoizedInitial setView={setView} />
      ) : view === "response" ? (
        <MemoizedResponse setView={setView} />
      ) : null}
    </div>
  );
}

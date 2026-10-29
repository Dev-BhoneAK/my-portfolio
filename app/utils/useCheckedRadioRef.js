import { useEffect, useRef } from "react";

// The React canary bundled with Next 13.4 unchecks a prerendered radio group
// while it hydrates: every radio after the checked one toggles its own
// defaultChecked, which checks it for a moment and takes the check away. The
// attribute stays, but the radio itself is unchecked, so screen readers hear
// no choice and Tab doesn't land on it.
//
// Put the returned ref on the checked radio. Once mounted, it checks that radio
// again. Style the choice from state too, not peer-checked, or it would flash
// unselected until this runs.
export function useCheckedRadioRef() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.checked = true;
  }, []);

  return ref;
}

/** The class on <html> that switches the styled scrollbars on (see globals.css). */
export const CLASSIC_SCROLLBARS_CLASS = "classic-scrollbars";

/**
 * Runs in <head> before first paint, next to the theme script. It measures the
 * platform's own scrollbar on a hidden probe: a bar that takes room (Windows,
 * Linux, a Windows tablet whose primary pointer is touch) gets the site's styled
 * bar; an overlay bar that takes none (phones, macOS by default) is left as the
 * platform draws it. The styled rules are keyed to the class, so the probe always
 * measures the unstyled bar. Without scripts the class never appears and every
 * bar stays native.
 */
export const SCROLLBAR_PROBE_SCRIPT = `(()=>{try{var r=document.documentElement,p=document.createElement("div");p.style.cssText="position:absolute;top:-9999px;left:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden";r.appendChild(p);var w=p.offsetWidth-p.clientWidth;r.removeChild(p);r.classList.toggle("${CLASSIC_SCROLLBARS_CLASS}",w>0);}catch(e){}})();`;

(function addCalendarNextToLayoutContainer() {
  if (document.getElementById("embedded-calendar")) return;

  const layoutContainer = document.querySelector(".layout-container"); // Replace with correct selector if needed
  if (!layoutContainer) {
    console.error("Layout-container not found on the page.");
    return;
  }

  // Create a wrapper to hold both layout-container and the calendar
  const wrapper = document.createElement("div");
  wrapper.id = "layout-calendar-wrapper";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "row";
  wrapper.style.width = "100%";
  wrapper.style.marginTop = "10px";
  wrapper.style.gap = "10px";

  layoutContainer.parentNode.insertBefore(wrapper, layoutContainer);
  wrapper.appendChild(layoutContainer);

  layoutContainer.style.flex = "2";
  layoutContainer.style.width = "70%";

  const calendarContainer = document.createElement("div");
  calendarContainer.id = "embedded-calendar";
  calendarContainer.style.flex = "1";
  calendarContainer.style.width = "30%";
  calendarContainer.style.backgroundColor = "#f9f9f9";
  calendarContainer.style.border = "1px solid #ccc";
  calendarContainer.style.overflow = "auto";
  calendarContainer.style.padding = "10px";

  // Match the height of layout-container
  const layoutContainerHeight = layoutContainer.getBoundingClientRect().height;
  calendarContainer.style.height = `${layoutContainerHeight}px`;

  wrapper.appendChild(calendarContainer);

  // Create an iframe to load the calendar
  const iframe = document.createElement("iframe");
  iframe.src = "https://webreg.usc.edu/Calendar"; // Replace with actual calendar URL
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  // Function to reload the iframe
  const reloadCalendar = () => {
    iframe.src = iframe.src; // Reloads the iframe
  };

  // Append the iframe to the calendar container
  calendarContainer.appendChild(iframe);

  // Use a mutation observer to watch for changes in the layout-container
  const observer = new MutationObserver(() => {
    console.log("Change detected in layout-container. Reloading calendar...");
    reloadCalendar();
  });

  observer.observe(layoutContainer, {
    childList: true, // Watch for changes to child elements
    subtree: true, // Watch for changes in the entire subtree
  });

  iframe.onload = () => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Remove outer-layout-container and outer-layout-footer
      const outerLayoutContainer = iframeDoc.querySelector(".outer-layout-container");
      const outerLayoutFooter = iframeDoc.querySelector(".outer-layout-footer");

      if (outerLayoutContainer) outerLayoutContainer.style.display = "none";
      if (outerLayoutFooter) outerLayoutFooter.style.display = "none";

      // Ensure #scheduler is visible
      const scheduler = iframeDoc.querySelector("#scheduler");
      if (scheduler) {
        scheduler.style.display = "block";
        scheduler.style.width = "100%";
      } else {
        console.error("Scheduler not found inside iframe.");
      }
    } catch (error) {
      console.error("Could not modify iframe content:", error);
    }
  };
})();

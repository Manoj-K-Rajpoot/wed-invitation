/**
 * Calendar utilities for wedding invitation
 */

export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent("Wedding Ceremony of Sajal & Aaradhya");
  const details = encodeURIComponent(
    "You are cordially invited to celebrate the auspicious wedding ceremony of Sajal Singhania & Aaradhya Sharma at The Oberoi Udaivilas, Udaipur.\n\n#SajalWedsAaradhya"
  );
  const location = encodeURIComponent("The Oberoi Udaivilas, Udaipur, Rajasthan, India");
  // 14 Dec 2026, 17:00 IST to 14 Dec 2026, 23:30 IST
  // In UTC: 20261214T113000Z to 20261214T180000Z
  const dates = "20261214T113000Z/20261214T180000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function generateOutlookCalendarUrl(): string {
  const subject = encodeURIComponent("Wedding Ceremony of Sajal & Aaradhya");
  const body = encodeURIComponent(
    "You are cordially invited to celebrate the wedding ceremony of Sajal & Aaradhya at The Oberoi Udaivilas, Udaipur."
  );
  const location = encodeURIComponent("The Oberoi Udaivilas, Udaipur, Rajasthan");
  const startdt = "2026-12-14T17:00:00";
  const enddt = "2026-12-14T23:30:00";

  return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${subject}&startdt=${startdt}&enddt=${enddt}&body=${body}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sajal and Aaradhya Royal Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:sajal-aaradhya-wedding-2026@invitation.com",
    "DTSTAMP:20261001T000000Z",
    "DTSTART:20261214T113000Z",
    "DTEND:20261214T180000Z",
    "SUMMARY:Wedding of Sajal & Aaradhya",
    "DESCRIPTION:We warmly invite you to celebrate the sacred wedding ceremony of Sajal Singhania and Aaradhya Sharma.\\nVenue: The Oberoi Udaivilas, Udaipur, Rajasthan.\\n#SajalWedsAaradhya",
    "LOCATION:The Oberoi Udaivilas, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Sajal & Aaradhya Wedding Tomorrow!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Sajal_and_Aaradhya_Wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

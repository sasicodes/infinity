export const injectStyles = (content: string) => {
  const styles = `
    <style>
      html, body {
        transform: scale(0.7);
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
      }
    </style>
  `;
  return content.replace("</head>", `${styles}</head>`);
};

// 5m ago, 1h ago, 1d ago, 1w ago, 1mo ago, 1y ago
export const formatDate = (date: Date | string) => {
  const now = new Date();
  const dateObj = date instanceof Date ? date : new Date(date);
  const diff = now.getTime() - dateObj.getTime();

  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (diffMinutes < 1) {
    return "just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  if (diffMonths < 12) {
    return `${diffMonths}mo ago`;
  }

  const remainingMonths = diffMonths % 12;
  if (remainingMonths === 0) {
    return `${diffYears}y ago`;
  }
  return `${diffYears}y ${remainingMonths}mo ago`;
};

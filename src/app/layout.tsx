import './styles.css';

export const metadata = {
  title: 'My Job Search',
  description: 'Private AI job search assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

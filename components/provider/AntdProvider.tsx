'use client';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider>{children}</ConfigProvider>;
}

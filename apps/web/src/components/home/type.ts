export interface Post {
  id: string;
  ipId: string;
  licenseTermsId: string;
  nodeId: string;
  html: string;
  content: string;
  username: string;
  createdAt: Date;
  _count: {
    licenses: number;
  };
}

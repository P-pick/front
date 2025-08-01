import { tourDetailSVG, commonSVG } from '@/assets';
import type { TourDetailCommon } from '@/entities/tour';
import { SafeHtmlRenderer } from '@/shared';

interface InformationLayoutProps {
  children: React.ReactNode;
}

const InformationLayout = ({ children }: InformationLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <>{children}</>
    </div>
  );
};

interface HeaderProps {
  common: TourDetailCommon;
  children?: React.ReactNode;
}

const Header = ({ common, children }: HeaderProps) => {
  if (!common) {
    return null;
  }

  return (
    <>
      <section className="p-3 w-full">
        <ul className="flex flex-col gap-2 text-sm">
          {common.homepage && (
            <li className="flex gap-3 justify-start items-center">
              <tourDetailSVG.WWWIcon className="w-3 h-3" />
              <SafeHtmlRenderer html={common.homepage} />
            </li>
          )}
          {common.addr1 && common.addr2 && common.zipcode && (
            <li className="flex gap-3 justify-start items-center">
              <commonSVG.LocationIcon className="w-3 h-3" />
              <div className="flex gap-1">
                <p>
                  {common.addr1}&nbsp;{common.addr2}&nbsp;(우){common.zipcode}
                </p>
              </div>
            </li>
          )}
          {common.tel && (
            <li className="flex gap-3 justify-start items-center">
              <tourDetailSVG.CallIcon className="w-3 h-3" /> {common.tel}
            </li>
          )}
          {children}
        </ul>
      </section>
      <hr className="my-3" />
    </>
  );
};

interface ContentProps {
  children: React.ReactNode;
}
const Content = ({ children }: ContentProps) => {
  return <section className="p-3">{children}</section>;
};

interface FooterProps {
  children: React.ReactNode;
}
const Footer = ({ children }: FooterProps) => {
  return (
    <>
      <hr className="my-3" />
      <section className="p-3">{children}</section>
    </>
  );
};

InformationLayout.Header = Header;
InformationLayout.Content = Content;
InformationLayout.Footer = Footer;

export default InformationLayout;

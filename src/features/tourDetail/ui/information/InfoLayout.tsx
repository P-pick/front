import type { ReactNode } from 'react';

import { tourDetailSVG, commonSVG } from '@/assets';

import { SafeHtmlRenderer } from '@/shared';
import { useEmptyChildElements } from '@/features/tourDetail';

import type { TourDetailCommon } from '@/entities/tour';

interface InfoLayoutProps {
  children: ReactNode;
}

const InfoLayout = ({ children }: InfoLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <>{children}</>
    </div>
  );
};

interface HeaderProps {
  common: TourDetailCommon;
  children?: ReactNode;
}

const Header = ({ common, children }: HeaderProps) => {
  const { childRef, isEmpty } = useEmptyChildElements();

  if (!common || isEmpty) {
    return null;
  }

  return (
    <>
      <section className="p-3 w-full">
        <div className="flex flex-col gap-2 text-sm" ref={childRef}>
          {common.homepage && (
            <div className="flex gap-3 justify-start items-center">
              <tourDetailSVG.WWWIcon className="w-3 h-3" />
              <SafeHtmlRenderer html={common.homepage} />
            </div>
          )}
          {(common.addr1 || common.addr2 || common.zipcode) && (
            <div className="flex gap-3 justify-start items-center">
              <commonSVG.LocationIcon className="w-3 h-3" />
              <div className="flex gap-1">
                <p>
                  {common.addr1}&nbsp;{common.addr2}&nbsp;(우){common.zipcode}
                </p>
              </div>
            </div>
          )}
          {common.tel && (
            <div className="flex gap-3 justify-start items-center">
              <tourDetailSVG.CallIcon className="w-3 h-3" /> {common.tel}
            </div>
          )}
          {children}
        </div>
      </section>
    </>
  );
};

interface ContentProps {
  children?: ReactNode;
}
const Content = ({ children }: ContentProps) => {
  const { childRef, isEmpty } = useEmptyChildElements();

  if (isEmpty) {
    return null;
  }

  return (
    <>
      <hr className="my-2" />
      <section className="p-3">
        <div className="flex flex-col gap-2 text-sm" ref={childRef}>
          {children}
        </div>
      </section>
    </>
  );
};

interface FooterProps {
  common: TourDetailCommon;
  children?: ReactNode;
}
const Footer = ({ common, children }: FooterProps) => {
  const { childRef, isEmpty } = useEmptyChildElements();

  if (!common || isEmpty) {
    return null;
  }

  return (
    <>
      <hr className="my-2" />
      <section className="p-3">
        <div className="flex flex-col gap-2 text-sm" ref={childRef}>
          {common.overview && <SafeHtmlRenderer html={common.overview} />}
          {children}
        </div>
      </section>
    </>
  );
};

InfoLayout.Header = Header;
InfoLayout.Content = Content;
InfoLayout.Footer = Footer;

export default InfoLayout;

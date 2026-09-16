import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { TAB_CONFIG, DISCOVER_SUB_CONFIG, TabType, getDiscoverSubSectionFromUrl } from '../utils/navigation';

interface BreadcrumbsProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeTab, onNavigate }) => {
  if (activeTab === 'tarot') {
    return null; // On homepage root, breadcrumbs aren't necessary
  }

  const currentTabMeta = TAB_CONFIG[activeTab];
  const isDiscover = activeTab === 'discover';
  const discoverSub = isDiscover ? getDiscoverSubSectionFromUrl() : null;
  const discoverSubMeta = discoverSub ? DISCOVER_SUB_CONFIG[discoverSub] : null;

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    onNavigate('tarot');
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
      <ol
        className="flex items-center gap-1.5 text-xs text-stone-500 font-medium"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <a
            href="/"
            onClick={handleHomeClick}
            itemProp="item"
            className="flex items-center gap-1 hover:text-orange-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span itemProp="name">Trang chủ</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>

        {activeTab === 'planner' && (
          <li
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <a
              href="/mon-ngon"
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.button === 1) return;
                e.preventDefault();
                onNavigate('catalog');
              }}
              itemProp="item"
              className="hover:text-orange-600 transition-colors"
            >
              <span itemProp="name">Món Ngon</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
        )}

        {isDiscover ? (
          <>
            <li
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <a
                href="/kham-pha-am-thuc"
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.button === 1) return;
                  e.preventDefault();
                  onNavigate('discover');
                }}
                itemProp="item"
                className="hover:text-orange-600 transition-colors"
              >
                <span itemProp="name">Khám Phá Ẩm Thực</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            {discoverSubMeta && (
              <li
                className="flex items-center gap-1.5"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-800 font-semibold" aria-current="page" itemProp="name">
                  {discoverSubMeta.label}
                </span>
                <link itemProp="item" href={`https://www.angigio.com${discoverSubMeta.path}`} />
                <meta itemProp="position" content="3" />
              </li>
            )}
          </>
        ) : (
          <li
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-800 font-semibold" aria-current="page" itemProp="name">
              {currentTabMeta.label}
            </span>
            <link itemProp="item" href={`https://www.angigio.com${currentTabMeta.path}`} />
            <meta itemProp="position" content={activeTab === 'planner' ? '3' : '2'} />
          </li>
        )}
      </ol>
    </nav>
  );
};

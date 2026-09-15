import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { TAB_CONFIG, TabType } from '../utils/navigation';

interface BreadcrumbsProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeTab, onNavigate }) => {
  if (activeTab === 'tarot') {
    return null; // On homepage root, breadcrumbs aren't necessary
  }

  const currentTabMeta = TAB_CONFIG[activeTab];

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    onNavigate('tarot');
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
      <ol className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
        <li className="flex items-center">
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-1 hover:text-orange-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </a>
        </li>
        {activeTab === 'planner' && (
          <li className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <a
              href="/mon-ngon"
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.button === 1) return;
                e.preventDefault();
                onNavigate('catalog');
              }}
              className="hover:text-orange-600 transition-colors"
            >
              Món Ngon
            </a>
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 font-semibold" aria-current="page">
            {currentTabMeta.label}
          </span>
        </li>
      </ol>
    </nav>
  );
};

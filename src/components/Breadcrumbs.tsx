import React, { useEffect, useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import {
  TAB_CONFIG,
  DISCOVER_SUB_CONFIG,
  TabType,
  DiscoverSubSection,
  getDiscoverSubSectionFromUrl,
} from '../utils/navigation';
import { getRegionFromUrl, getRegionById, isRegionPath } from '../data/regionalCuisine';
import { findDishByRecipeSlug, getDishRecipe, getRecipeArticleTitle, getRecipePath } from '../data/recipes';
import { INITIAL_DISHES } from '../data/dishes';

interface BreadcrumbsProps {
  activeTab: TabType;
  discoverSub?: DiscoverSubSection;
  onNavigate: (tab: TabType, sub?: DiscoverSubSection) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  activeTab,
  discoverSub,
  onNavigate,
}) => {
  // Force re-render on any popstate or custom locationchange events
  // Note: All hooks MUST be called unconditionally at top of component before any early return
  const [, setTick] = useState(0);
  useEffect(() => {
    const handleUrlChange = () => setTick((t) => t + 1);
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('locationchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('locationchange', handleUrlChange);
    };
  }, []);

  if (activeTab === 'tarot') {
    return null; // On homepage root, breadcrumbs aren't necessary
  }

  const currentTabMeta = TAB_CONFIG[activeTab];
  const isDiscover = activeTab === 'discover';
  const effectiveDiscoverSub = isDiscover
    ? discoverSub || getDiscoverSubSectionFromUrl()
    : null;
  const discoverSubMeta = effectiveDiscoverSub
    ? DISCOVER_SUB_CONFIG[effectiveDiscoverSub]
    : null;

  // Check if currently on a specific regional page (e.g. /am-thuc-mien-bac)
  const isSpecificRegion =
    effectiveDiscoverSub === 'region' &&
    typeof window !== 'undefined' &&
    isRegionPath(window.location.pathname);
  const activeRegionId = isSpecificRegion ? getRegionFromUrl() : null;
  const activeRegion = activeRegionId ? getRegionById(activeRegionId) : null;

  // Check if currently on a specific recipe article page (e.g. /cach-nau-pho-bo-tai-lan)
  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isRecipeArticle =
    effectiveDiscoverSub === 'recipe' &&
    (currentPathname.startsWith('/cach-nau-') ||
      currentPathname.startsWith('/cach-lam-') ||
      currentPathname.startsWith('/cach-nau-mon-ngon/')) &&
    currentPathname !== '/cach-nau-mon-ngon';

  const recipeDish = isRecipeArticle ? findDishByRecipeSlug(currentPathname, INITIAL_DISHES) : null;
  const recipeArticleTitle = recipeDish ? getRecipeArticleTitle(recipeDish, getDishRecipe(recipeDish)) : null;

  const currentLabel =
    isDiscover && discoverSubMeta ? discoverSubMeta.label : currentTabMeta?.label;
  const currentPath =
    isDiscover && discoverSubMeta ? discoverSubMeta.path : currentTabMeta?.path;

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    onNavigate('tarot');
  };

  const handleRegionHubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    onNavigate('discover', 'region');
  };

  const handleRecipeHubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    onNavigate('discover', 'recipe');
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

        {isSpecificRegion && activeRegion ? (
          <>
            <li
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <a
                href="/am-thuc-vung-mien"
                onClick={handleRegionHubClick}
                itemProp="item"
                className="hover:text-orange-600 transition-colors"
              >
                <span itemProp="name">Ẩm Thực Vùng Miền</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>

            <li
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span
                className="text-stone-800 font-semibold"
                aria-current="page"
                itemProp="name"
              >
                {activeRegion.name}
              </span>
              <link itemProp="item" href={`https://www.angigio.com${activeRegion.path}`} />
              <meta itemProp="position" content="3" />
            </li>
          </>
        ) : isRecipeArticle && recipeDish && recipeArticleTitle ? (
          <>
            <li
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <a
                href="/cach-nau-mon-ngon"
                onClick={handleRecipeHubClick}
                itemProp="item"
                className="hover:text-orange-600 transition-colors"
              >
                <span itemProp="name">Cách Nấu Món Ngon</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>

            <li
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span
                className="text-stone-800 font-semibold truncate max-w-xs sm:max-w-md"
                aria-current="page"
                itemProp="name"
              >
                {recipeArticleTitle}
              </span>
              <link itemProp="item" href={`https://www.angigio.com${getRecipePath(recipeDish)}`} />
              <meta itemProp="position" content="3" />
            </li>
          </>
        ) : (
          <li
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span
              className="text-stone-800 font-semibold"
              aria-current="page"
              itemProp="name"
            >
              {currentLabel}
            </span>
            <link itemProp="item" href={`https://www.angigio.com${currentPath}`} />
            <meta itemProp="position" content="2" />
          </li>
        )}
      </ol>
    </nav>
  );
};

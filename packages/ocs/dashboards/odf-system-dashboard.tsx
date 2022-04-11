import * as React from 'react';
import { LoadingBox } from '@odf/shared/generic/status-box';
import PageHeading from '@odf/shared/heading/page-heading';
import Tabs, { TabPage } from '@odf/shared/utils/Tabs';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { match as Match } from 'react-router-dom';
import OCSSystemDashboard from './ocs-system-dashboard';

export type DashboardsPageProps = RouteComponentProps;

type ODFSystemDashboardPageProps = Omit<DashboardsPageProps, 'match'> & {
  match: Match<{ systemName: string }>;
};

const ODFSystemDashboard: React.FC<ODFSystemDashboardPageProps> = ({
  match,
}) => {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      name: t('StorageSystems'),
      path: '/odf/systems',
    },
    {
      name: t('StorageSystem details'),
      path: '',
    },
  ];

  const [pages, setPages] = React.useState<TabPage[]>([]);

  const overviewPage = React.useMemo(
    () => [
      {
        component: OCSSystemDashboard,
        title: t('Overview'),
        href: 'overview',
      },
    ],
    [t]
  );

  React.useEffect(() => {
    setPages(overviewPage);
  }, [overviewPage]);

  const title = match.params.systemName;

  return (
    <>
      <PageHeading title={title} breadcrumbs={breadcrumbs} />
      {pages.length > 0 ? (
        <Tabs id="odf-tab" match={match} tabs={pages} />
      ) : (
        <LoadingBox />
      )}
    </>
  );
};

export default ODFSystemDashboard;
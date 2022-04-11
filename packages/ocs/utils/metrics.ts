import { DataPoint } from '@odf/shared/utils';
import { Alert, Humanize } from '@openshift-console/dynamic-plugin-sdk';
import * as _ from 'lodash';
import { Colors, COLORMAP } from '../constants';

export const getStackChartStats: GetStackStats = (
  response,
  humanize,
  labelNames
) =>
  response.map((r, i) => {
    const capacity = humanize(r.y).string;
    return {
      // x value needs to be same for single bar stack chart
      x: '0',
      y: r.y,
      name: labelNames ? labelNames[i] : _.truncate(`${r.x}`, { length: 12 }),
      link: labelNames ? labelNames[i] : `${r.x}`,
      color: labelNames ? Colors.OTHER : Colors.LINK,
      fill: COLORMAP[i],
      label: capacity,
      id: i,
      ns: r.metric.namespace,
    };
  });

type GetStackStats = (
  response: DataPoint[],
  humanize: Humanize,
  labelNames?: string[]
) => StackDataPoint[];

export type StackDataPoint = DataPoint<string> & {
  name: string;
  link: string;
  color: string;
  fill: string;
  id: number;
  ns: string;
};

export const filterCephAlerts = (alerts: Alert[]): Alert[] => {
  const rookRegex = /.*rook.*/;
  return alerts
    ? alerts?.filter(
        (alert) =>
          alert?.annotations?.storage_type === 'ceph' ||
          Object.values(alert?.labels)?.some((item) => rookRegex.test(item))
      )
    : [];
};
import { FC, PropsWithChildren, ReactNode } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
    dataLength: number;
    loadMore: () => void;
    hasMore: boolean;
    loader?: ReactNode;
    endMessage?: ReactNode;
    scrollThreshold?: number | string;
    className?: string;
    style?: object;
};

export const MyInfiniteScroll: FC<PropsWithChildren<Props>> = ({ dataLength, children, loadMore, hasMore, loader,
                                                                 endMessage, scrollThreshold = '200px', className,
                                                                 style }) => (
    <InfiniteScroll
        dataLength={dataLength}
        next={loadMore}
        hasMore={hasMore}
        loader={loader}
        endMessage={endMessage}
        className={className}
        style={style}
        scrollThreshold={scrollThreshold}
    >
        {children}
    </InfiniteScroll>
);

export default MyInfiniteScroll;

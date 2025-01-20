import React from "react";

export type Marker = {
    id: number;
    coordinate: {
        latitude: number;
        longitude: number;
    };
};

export type MarkerRef = {
    showCallout: () => void;
    hideCallout: () => void;
};

export type CustomMarkerProps = {
    marker: Marker;
    locationInfo: string;
    weatherInfo: string;
    toggleCallout: (markerId: number) => void;
    markerRefs: React.MutableRefObject<Record<number, MarkerRef | undefined>>;
};

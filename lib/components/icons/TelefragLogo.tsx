import { FC, useEffect, useState } from "react";

const color = {
    dark: {
        back: '#287BBF',
        fore: '#ccc',
        text: '#999',
    },
    light: {
        back: '#287BBF',
        fore: 'white',
        text: '#555',
    }
};

type Props ={
    theme?: 'light'|'dark';
};

const TelefragLogo: FC<Props> = ({ theme }) => {
    const [ innerTheme, setInnerTheme ] = useState<'dark'|'light'>('light');

    useEffect(() => {
        if (theme) {
            // Если тема принудительно выставлена в опциях, то ставим её и выходим
            setInnerTheme(theme);
            return;
        }
        // Если тема не указана, то считываем её из атрибута документа
        const t = document.documentElement.getAttribute('data-theme');
        if (t === 'dark') setInnerTheme('dark'); else setInnerTheme('light');
        // Устанавливаем наблюдателя за изменением темы документа        
        let observer = new MutationObserver(() => {
            const t = document.documentElement.getAttribute('data-theme');
            if (t === 'dark') setInnerTheme('dark'); else setInnerTheme('light');
        });
        observer.observe(document.documentElement, {
            attributes: true, // наблюдать за изменением атрибутов
        });

        return () => observer.disconnect();
    }, [ theme ]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="156.748mm"
            height="21.7468mm"
            viewBox="0 0 15503.88 2150.97"
        >
            <path fill={color[innerTheme].back} d="M7990.87 2137.37c809.18,0 1467.66,-479.95 1467.66,-1071.46 0,-586 -658.48,-1065.91 -1467.66,-1065.91 -809.16,0 -1467.64,479.91 -1467.64,1065.91 0,591.51 658.48,1071.46 1467.64,1071.46z"/>
            <path fill={color[innerTheme].fore} d="M8095.54 173.7c649.88,38.52 1162.11,457.13 1162.11,892.25 0,429.58 -380.01,743.54 -908.79,853.7 407.6,-104.67 699.52,-391.06 699.52,-699.48 0,-313.93 -264.38,-567.31 -638.9,-682.98l-60.62 286.42c331.79,120.61 672.43,399.28 253.36,666.43 11.06,-16.19 38.54,-40.29 38.54,-115.68 0,-101.9 -154.17,-203.75 -357.94,-264.35l-187.27 853.67 0 -1663.33 0 -126.66zm-209.34 126.66l0 1663.33 -313.93 -1431.99c-380.01,115.65 -644.39,379.99 -644.39,688.46 0,302.91 258.89,567.29 633.42,682.96 -484.68,-126.7 -837.17,-457.16 -837.17,-837.18 0,-468.16 512.2,-853.73 1162.07,-892.25l0 126.66z"/>
            <path fill={color[innerTheme].text} d="M12822.53 694.56c0,-55.27 15.52,-90.65 46.41,-126.02 67.53,-77.3 166.98,-48.99 225.51,-30.94l66.31 -174.67c-158.22,-52.42 -328.93,-58.97 -453.18,75.17 -66.99,72.34 -101.71,159.21 -108.36,278.57l-141.48 0 0 190.1 141.48 0 0 800.26 227.73 0 0 -800.26 198.97 0 0 -190.1 -201.18 0c-2.22,-6.65 -2.22,-15.47 -2.22,-22.11zm1759.42 513.87c0,-148.24 42.71,-268.93 128.13,-362.08 85.41,-93.15 198.37,-139.89 338.56,-139.89 117.29,0 213.57,28.44 289.18,85.17 46.5,-49.6 103.19,-74.79 166.07,-85.17l0 998.16c0,139.22 -64.13,290.4 -197.73,378.03 -140.51,92.16 -371.92,81.14 -550.45,25.52l62.14 -208.11c92.6,25.77 242.22,61.15 343.11,9.58 109.17,-55.8 116.41,-127.36 116.41,-201.63l0 -43.8c-65,33.65 -141.22,50.5 -228.72,50.5 -147.61,0 -262.12,-46.11 -343.82,-138.34 -82.02,-92.22 -122.87,-215.08 -122.87,-367.96zm695.41 173.53l0 -350.65c-23.3,-50.52 -73.21,-138.97 -216.74,-138.97 -70.87,0 -138.86,27.66 -180.32,83.05 -41.78,55.71 -62.52,133.38 -62.52,233.03 0,213.85 86.86,320.46 240.67,320.46 116.1,0 197.65,-65.71 218.92,-146.93zm-3864.59 -1080.91l-227.69 55.27 0 1136.28c0,141.52 123.8,214.44 225.47,214.44l120.59 0 0 -198.94c-66.61,2.81 -118.39,-36.92 -118.38,-94.64l0 -1112.41zm3099.18 889.52c0.3,-187.89 -33.15,-316.13 -101.7,-382.43 -85.82,-83.02 -212.57,-101.68 -327.17,-101.68 -43.1,0 -83.67,3.52 -121.99,9.7 -56,9.04 -107.2,23.82 -154.35,41.72l49.75 189.89c58.77,-22.06 140.35,-42.37 226.58,-42.37 116.54,0 201.16,28.14 201.16,161.41 -68.7,-11.23 -106.65,-15.13 -174.64,-11.08 -117.48,7.02 -210.01,42.02 -278.53,92.86 -86.18,65.63 -126.03,156 -126.03,263.06 0,202.93 137.46,305.59 336.04,305.59 90.33,0 222.68,-42.36 267.49,-110.61 24.41,45.87 83.97,103.13 187.99,100.4l14.58 0 0.81 -516.47zm-225.47 127.32c0,136.27 -66.69,212.07 -203.4,215.35 -101.67,2.43 -150.32,-44.19 -150.32,-130.4 0,-95.07 57.6,-151.87 176.85,-170.24 65.04,-10.03 113.18,-8.33 176.87,6.62l0 78.68zm-2294.54 -609.04c-301.22,2.54 -481.95,229.89 -481.95,512.87 0,268.03 211.72,488.58 481.95,493.01 134.45,2.21 270.23,-17.77 384.65,-95.07l-83.95 -170.07c-57.04,46.2 -187.18,83.39 -300.7,72.82 -118.27,-11.02 -238.86,-126.76 -245.42,-241.01l701.79 0c52.02,-325.51 -120.19,-575.38 -456.37,-572.54zm-238.77 402.33c20.59,-129.42 105.2,-213.33 243.18,-212.25 139.27,1.09 230.31,71.86 239.24,212.25l-482.42 0zm-1109.76 -402.33c-301.22,2.54 -481.95,229.89 -481.95,512.87 0,268.03 211.72,488.58 481.95,493.01 134.45,2.21 270.23,-17.77 384.65,-95.07l-83.95 -170.07c-57.04,46.2 -187.18,83.39 -300.7,72.82 -118.27,-11.02 -238.86,-126.76 -245.42,-241.01l701.79 0c52.02,-325.51 -120.19,-575.38 -456.37,-572.54zm-238.77 402.33c20.59,-129.42 105.2,-213.33 243.18,-212.25 139.27,1.09 230.31,71.86 239.24,212.25l-482.42 0zm3290.99 -178.22l93.8 -187.56c-135.84,-67.86 -333.64,-43 -435.51,72.96l0 -101.68 -227.69 0 0 990.36 227.69 0 0 -557.1c0,-70.74 19.91,-128.24 61.91,-176.85 29.24,-33.84 159.31,-110.97 279.81,-40.13zm-3273.01 -353.38l64.16 0 0 -212.25 -64.16 0 -123.8 0 -921.85 0 0 212.25 426.66 0 0 1127.45 238.77 0 0 -1127.45 256.42 0 123.8 0z"/>
            <path fill={color[innerTheme].text} d="M2337.88 708.85c-301.22,2.54 -481.95,229.89 -481.95,512.87 0,268.03 211.72,488.58 481.95,493.01 134.45,2.21 270.23,-17.77 384.65,-95.07l-83.95 -170.07c-57.04,46.2 -187.18,83.39 -300.7,72.82 -118.27,-11.02 -238.86,-126.76 -245.42,-241.01l701.79 0c52.02,-325.51 -120.19,-575.38 -456.37,-572.54zm-1174.7 -341.52c-369.93,0 -793.25,0 -1163.18,0l0 212.25 426.66 0 0 1127.45 238.77 0 0 -1127.45 267.83 0 0 1127.45 229.93 0 0 -696.33c38.7,-58.2 127.81,-99.5 196.75,-99.5 120.28,0 201.17,78.06 201.17,198.97l0 596.86 227.7 0 0 -596.86c0,-246.43 -132.79,-391.29 -382.45,-391.29 -103.9,0 -183.5,26.51 -243.17,79.56 0,-143.71 0,-287.41 0,-431.12zm5122.47 349.34l-236.54 672.03 -265.32 -672.03 -236.44 -0.14 397.83 970.6c-41.98,123.8 -91.45,143.26 -252.02,139.3l0 207.83c172.65,0 330.31,-0.33 402.37,-190.14l426.66 -1127.45 -236.52 0zm-2343.31 274.1c0,-70.73 -8.84,-134.83 -24.31,-196.71 -26.55,-97.29 -75.17,-183.53 -145.91,-254.24 -95.05,-95.07 -218.85,-143.7 -371.41,-154.77 -28.72,-2.22 -57.47,-4.39 -88.43,-4.39l-446.56 0 0 1326.38 386.88 0c53.08,0 101.7,-2.18 148.11,-8.85 285.2,-37.56 457.64,-192.29 517.32,-462 15.47,-72.99 24.31,-154.76 24.31,-245.42zm-344.88 378.07c-50.84,66.31 -117.15,101.64 -196.75,114.93 -26.51,4.4 -55.25,8.86 -83.99,8.86l-214.44 0 2.2 -906.41 196.77 0c35.37,0 68.52,2.22 99.46,6.62 196.75,33.18 296.24,165.81 296.24,413.43 0,154.73 -33.16,276.35 -99.48,362.56zm1198.42 -652.17l0 185.71 108.53 0 0 804.65 229.93 0 0 -990.36 -338.46 0zm-45.82 474.44c0.29,-187.89 -33.15,-316.13 -101.7,-382.43 -85.82,-83.02 -212.57,-101.68 -327.17,-101.68 -106.09,0 -196.93,21.28 -276.33,51.42l49.75 189.89c58.77,-22.06 140.35,-42.37 226.58,-42.37 116.54,0 201.16,28.14 201.16,161.41 -68.7,-11.23 -106.65,-15.13 -174.64,-11.08 -117.48,7.02 -210.01,42.02 -278.53,92.86 -86.18,65.63 -126.03,156 -126.03,263.06 0,202.93 137.46,304.5 336.04,304.5 90.33,0 222.68,-41.28 267.49,-109.52 30.95,52.41 83.99,102.59 188.01,99.86l14.58 0 0.79 -515.92zm-225.47 127.32c0,136.27 -66.69,212.07 -203.4,215.35 -101.67,2.43 -150.32,-44.19 -150.32,-130.4 0,-95.07 57.6,-151.87 176.85,-170.24 65.04,-10.03 113.18,-8.33 176.87,6.62l0 78.68zm497 -977.58c-35.37,0 -68.54,13.22 -92.86,39.8 -26.53,24.29 -39.78,55.24 -39.78,92.86 0,35.33 13.25,66.28 39.78,92.82 24.31,24.3 57.49,37.59 92.86,37.59 35.37,0 66.33,-13.28 92.86,-37.59 26.51,-26.54 37.55,-57.49 37.55,-92.82 0,-37.62 -11.04,-68.56 -37.55,-92.86 -26.53,-26.58 -57.49,-39.8 -92.86,-39.8zm493.63 -39.8l-227.69 55.27 0 1136.28c0,141.52 123.8,214.44 225.47,214.44l120.59 0 0 -198.94c-66.61,2.81 -118.39,-36.91 -118.38,-94.63l0 -1112.42zm-3416.1 810.12c20.59,-129.42 105.2,-213.33 243.18,-212.25 139.27,1.09 230.31,71.86 239.24,212.25l-482.42 0z"/>
        </svg>
    );
};

export default TelefragLogo;

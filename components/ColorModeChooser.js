import { useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Switch, Input } from 'antd';

const ColorModeChooser = () => {
    const [isDarkMode, setIsDarkMode] = useState();
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    if (status === 'loading') {
        return <div>Loading styles...</div>;
    }

    return (
        <>
            <span>current theme is: {currentTheme}</span>
            <Switch checked={isDarkMode} onChange={toggleTheme} />

            <Input
                style={{ width: 300, marginTop: 30 }}
                placeholder="I will change with the theme!"
            />
        </>
    );
};

export default ColorModeChooser;

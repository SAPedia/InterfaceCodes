import { useState, type ReactNode } from 'react';
import './preferences.css';

function makeSetter<T extends readonly string[]>(options: T, base: string) {
    return (newOption: T[number]) => {
        const classList = document.documentElement.classList;
        for (const option of options) {
            classList.remove(base + option);
        }
        classList.add(base + newOption);
    };
}

function RadioGroup({
    name,
    options,
    columns,
    defaultValue,
    onChange,
}: {
    name: string;
    options: { value: string; label: ReactNode; preview?: ReactNode }[];
    columns: number;
    defaultValue: string;
    onChange: (value: string) => void;
}) {
    const [selected, setSelected] = useState(defaultValue);
    return (
        <div className="pref-radio" style={{ '--pref-columns': columns } as React.CSSProperties}>
            {options.map(opt => (
                <label
                    key={opt.value}
                    className={`pref-radio__item${selected === opt.value ? ' pref-radio__item--checked' : ''}`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={selected === opt.value}
                        className="pref-radio__input"
                        onChange={() => {
                            setSelected(opt.value);
                            onChange(opt.value);
                        }}
                    />
                    {opt.preview && <span className="pref-radio__preview">{opt.preview}</span>}
                    <span className="pref-radio__label">{opt.label}</span>
                </label>
            ))}
        </div>
    );
}

function ToggleSwitch({
    id,
    label,
    defaultChecked,
    onChange,
}: {
    id: string;
    label: string;
    defaultChecked: boolean;
    onChange: (checked: boolean) => void;
}) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <label className="pref-switch" htmlFor={id}>
            <span className="pref-switch__label">{label}</span>
            <span className="pref-switch__track">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    className="pref-switch__input"
                    onChange={e => {
                        setChecked(e.target.checked);
                        onChange(e.target.checked);
                    }}
                />
                <span className="pref-switch__grip" />
            </span>
        </label>
    );
}

const ThemePreview = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
    >
        <rect x="4" y="4" width="24" height="6" rx="1" fill="currentColor" opacity="0.8" />
        <rect x="4" y="14" width="10" height="14" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="18" y="14" width="10" height="6" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="18" y="22" width="10" height="6" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
);

export function Preferences() {
    const setTheme = makeSetter(['os', 'day', 'night'] as const, 'skin-theme-clientpref-');
    const setFontSize = makeSetter(
        ['small', 'standard', 'large', 'xlarge'] as const,
        'citizen-feature-custom-font-size-clientpref-',
    );
    const setWidth = makeSetter(
        ['standard', 'wide', 'full'] as const,
        'citizen-feature-custom-width-clientpref-',
    );
    const setPureBlack = makeSetter(['0', '1'] as const, 'citizen-feature-pure-black-clientpref-');
    const setPerformanceMode = makeSetter(
        ['0', '1'] as const,
        'citizen-feature-performance-mode-clientpref-',
    );
    const setAutohideNav = makeSetter(
        ['0', '1'] as const,
        'citizen-feature-autohide-navigation-clientpref-',
    );

    return (
        <>
            <div className="pref">
                <section className="pref-section">
                    <div className="pref-section__heading">外观</div>
                    <div className="pref-section__content">
                        <div className="pref-group">
                            <div className="pref-group__label">颜色主题</div>
                            <RadioGroup
                                name="skin-theme"
                                columns={3}
                                defaultValue="os"
                                onChange={v => setTheme(v as 'os' | 'day' | 'night')}
                                options={[
                                    { value: 'os', label: '自动', preview: <ThemePreview /> },
                                    { value: 'day', label: '浅色', preview: <ThemePreview /> },
                                    { value: 'night', label: '深色', preview: <ThemePreview /> },
                                ]}
                            />
                        </div>
                        <ToggleSwitch
                            id="skin-client-prefs-citizen-feature-pure-black"
                            label="纯黑模式"
                            defaultChecked={false}
                            onChange={v => setPureBlack(v ? '1' : '0')}
                        />
                    </div>
                </section>
                <section className="pref-section">
                    <div className="pref-section__heading">布局</div>
                    <div className="pref-section__content">
                        <div className="pref-group">
                            <div className="pref-group__label">文字大小</div>
                            <RadioGroup
                                name="citizen-feature-custom-font-size"
                                columns={2}
                                defaultValue="standard"
                                onChange={v =>
                                    setFontSize(v as 'small' | 'standard' | 'large' | 'xlarge')
                                }
                                options={[
                                    { value: 'small', label: '小' },
                                    { value: 'standard', label: '标准' },
                                    { value: 'large', label: '大' },
                                    { value: 'xlarge', label: '特大' },
                                ]}
                            />
                        </div>
                        <div className="pref-group">
                            <div className="pref-group__label">页面宽度</div>
                            <RadioGroup
                                name="citizen-feature-custom-width"
                                columns={3}
                                defaultValue="wide"
                                onChange={v => setWidth(v as 'standard' | 'wide' | 'full')}
                                options={[
                                    { value: 'standard', label: '标准' },
                                    { value: 'wide', label: '宽' },
                                    { value: 'full', label: '全宽' },
                                ]}
                            />
                        </div>
                        <ToggleSwitch
                            id="skin-client-prefs-citizen-feature-performance-mode"
                            label="效能模式"
                            defaultChecked={false}
                            onChange={v => setPerformanceMode(v ? '1' : '0')}
                        />
                        <ToggleSwitch
                            id="skin-client-prefs-citizen-feature-autohide-navigation"
                            label="自动隐藏导航"
                            defaultChecked={false}
                            onChange={v => setAutohideNav(v ? '1' : '0')}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}

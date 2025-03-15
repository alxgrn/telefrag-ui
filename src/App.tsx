import { useState } from 'react';
import { Icons as Icon, Form, Files, Input, RadioList, Select, Checkbox, CheckboxList, Fieldset, Date, FormData, FormRow, FormCol, Time, Modal, Button, Alert, Confirm, Prompt, Panel, Layout, Page, MainMenuItem, PageHeader, Image } from '../lib/main';
import { CheckboxListOption } from '../lib/components/form/checkbox/CheckboxList';
import { RadioListOption, RadioListValue } from '../lib/components/form/radio/RadioList';
import { Menu } from '../lib/components/icons';

const options = [
    { value: 'one', option: 'one' },
    { value: 'two', option: 'two' },
    { value: 'three', option: 'three', disabled: true },
];

const radios: RadioListOption[] = [
    { value: 'one', label: 'One', bottom: 'Radio hint' },
    { value: 'two', label: 'Two', disabled: true },
    { value: 'three', label: 'Three', required: false },
];

const checkboxes: CheckboxListOption[] = [
    { value: 'one', label: 'One', bottom: 'Check hint' },
    { value: 2, label: 'Two', disabled: true, checked: false },
    { value: 'three', label: 'Three', checked: true },
    { value: 4, label: 'Four', checked: true },
];

const mainMenu: MainMenuItem[] = [{
    id: 'articles',
    text: 'Публикации',
    icon: <Icon.Files/>,
},{
    id: 'groups',
    text: 'Группы',
    icon: <Icon.Users/>,
},{
    title: 'Заголовок',
},{
    id: 'img',
    text: 'Картинка где-то далеко',
    icon: <img src='https://habrastorage.org/getpro/habr/company/7c0/e9b/e19/7c0e9be196cdcb46ffbf5be93ddb1af3.png'/>,
    checked: true,
},{
    id: 'projects',
    text: 'Проекты',
    icon: <Icon.Gamepad/>,
},{
    id: 'launches',
    text: 'Запуски',
    icon: <Icon.Rocket/>,
},{
    id: 'calendar',
    text: 'Календарь',
    icon: <Icon.Calendar/>,
}];

const file = new File(['CONTENT'], 'test.txt', { type: 'text/plain;charset=utf-8' });

function App() {
    const [ date, setDate ] = useState('01.01.2023');
    const [ time, setTime ] = useState('03:45');
    const [ text, setText ] = useState('Hello');
    const [ radio, setRadio ] = useState<RadioListValue>('');
    const [ select, setSelect ] = useState('');
    const [ password, setPassword ] = useState('1234567');
    const [ textarea, setTextarea ] = useState('Lorem ipsum dolor sit amet...');
    const [ checkbox1, setCheckbox1 ] = useState(true);
    const [ checkbox2, setCheckbox2 ] = useState(false);
    const [ checkbox3, setCheckbox3 ] = useState(true);
    const [ files, setFiles ] = useState<File[]>([file]);
    const [ image, setImage ] = useState<File|undefined>(undefined);
    const [ checkboxlist, setCheckboxList ] = useState(checkboxes);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isAlertOpen, setIsAlertOpen ] = useState(false);
    const [ isConfirmOpen, setIsConfirmOpen ] = useState(false);
    const [ isPromptOpen, setIsPromptOpen ] = useState(false);
    const [ theme, setTheme ] = useState<'light'|'dark'>('light');
    const [ isSidebarVisible, setIsSidebarVisible ] = useState(false);

    const onSubmit = (data: FormData) => {
        window.alert(data);
        console.dir(data);
    };

    const onCheckboxChange = (b: boolean, w: number) => {
        switch(w) {
            case 1:
                setCheckbox1(b);
                break;
            case 2:
                setCheckbox2(b);
                break;
            default:
                setCheckbox3(b);
                break;
        }
    };

    const onFilesChange = (files: File[]) => {
        setFiles(files);
    };

    const onTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    };

    return (
    <Layout mainMenu={[...mainMenu, ...mainMenu, ...mainMenu]} userMenu={<Menu/>}>
        <Page
            header={<PageHeader
                    menu={<Button onClick={() => setIsSidebarVisible(true)} label='Sidebar' size='Small'/>}
                    title='Имя Фамилия'
                    subtitle='Очень длинное описание чего-либо'
                    logo='https://dailytelefrag.ru/api/files/523'
                    back='https://dailytelefrag.ru/api/files/524'
                    admin
                    square
                    onLogoClick={() => {}}
                    onLogoCreate={() => {}}
                    onLogoRemove={() => {}}
                    onBackClick={() => {}}
                    onBackCreate={() => {}}
                    onBackRemove={() => {}}
                    onShowSidebar={() => setIsSidebarVisible(true)}
            />}
            sidebar={
                <Panel>
                <p>
                    <Button type='Default' label='Default'/>&nbsp;
                    <Button type='Accent' label='Accent'/>&nbsp;
                    <Button type='Success' label='Success'/>&nbsp;
                    <Button type='Error' label='Error'/>&nbsp;
                </p>
                <p>
                    <Button type='Default' size='Small' label='Default'/>&nbsp;
                    <Button type='Accent' size='Small' label='Accent'/>&nbsp;
                    <Button type='Success' size='Small' label='Success'/>&nbsp;
                    <Button type='Error' size='Small' label='Error'/>&nbsp;
                </p>
            </Panel>}
            isSidebarVisible={isSidebarVisible}
            onSidebarClose={() => setIsSidebarVisible(false)}
        >
            <Panel>
                <header>React Form Test</header>
                <Button type='Accent' onClick={() => setIsAlertOpen(true)} label='Alert'/>&nbsp;
                <Button type='Success' onClick={() => setIsConfirmOpen(true)} label='Confirm'/>&nbsp;
                <Button type='Error' onClick={() => setIsPromptOpen(true)} label='Prompt'/>&nbsp;
                <Button onClick={() => onTheme()} label={theme === 'dark' ? 'Dark' : 'Light'}/>&nbsp;
                <span className='LayoutSidebarIsShown'>
                    <Button onClick={() => setIsSidebarVisible(true)} label='Sidebar'/>
                </span>
            </Panel>
            <Panel>
                <Form
                    info='Info text'
                    success='Success text'
                    error='Error text'
                    submit='Submit button'
                    onSubmit={onSubmit}
                    wide={true}
                    cancel='Cancel'
                    onCancel={() => setIsModalOpen(true)}
                >
                    <FormRow>
                        <FormCol>
                            <Input
                                id='text'
                                required={true}
                                value={text}
                                onChange={setText}
                                label='Text label'
                                disabled={true}
                                top='Top text'
                                bottom='Bottom text'
                            />
                        </FormCol>
                        <FormCol>
                            <Input
                                id='password'
                                type='password'
                                required={true}
                                value={password}
                                onChange={setPassword}
                                label='Password label'
                                placeholder='Password placeholder'
                                top='Password top'
                                bottom='Password bottom'
                            />
                        </FormCol>
                    </FormRow>
                    <FormRow>
                        <FormCol>
                            <Date
                                id='date'
                                value={date}
                                onChange={setDate}
                                label='Date label'
                                required={true}
                                top='Date top'
                                bottom='Date bottom'
                            />
                        </FormCol>
                        <FormCol>
                            <Select
                                id='select'
                                label='Select label'
                                value={select}
                                options={options}
                                onChange={setSelect}
                                required={true}
                                placeholder='Select something'
                                disabled={false}
                                top='Top select'
                                bottom='Bottom select'
                            />
                        </FormCol>
                    </FormRow>
                    <FormRow>
                        <FormCol>
                            <Input
                                id='textarea'
                                type='textarea'
                                value={textarea}
                                onChange={setTextarea}
                                label='Textarea label'
                                placeholder='Textarea placeholder'
                                bottom='Textarea bottom'
                            />
                        </FormCol>
                        <FormCol>
                            <Time
                                id='time'
                                step={5}
                                label='Time selector'
                                value={time}
                                onChange={setTime}
                                disabled={false}
                                required={true}
                            />
                        </FormCol>
                    </FormRow>
                    <FormRow>
                        <FormCol>
                            <RadioList
                                id='radio'
                                label='Radio legend'
                                value={radio}
                                options={radios}
                                onChange={setRadio}
                                required={true}
                            />
                        </FormCol>
                        <FormCol>
                            <Fieldset
                                label='Checkbox Legend'
                            >
                                <Checkbox
                                    id='checkbox1'
                                    value='checkbox1'
                                    checked={checkbox1}
                                    onChange={(b) => onCheckboxChange(b, 1)}
                                    label='Checkbox1 label'
                                    bottom='Checkbox1 bottom'
                                    required={true}
                                />
                                <Checkbox
                                    id='checkbox2'
                                    value='checkbox2'
                                    checked={checkbox2}
                                    onChange={(b) => onCheckboxChange(b, 2)}
                                    label='Checkbox2 label'
                                    bottom='Checkbox2 hint'
                                    disabled={true}
                                />
                                <Checkbox
                                    id='checkbox3'
                                    value='checkbox3'
                                    checked={checkbox3}
                                    onChange={(b) => onCheckboxChange(b, 3)}
                                    label='Checkbox3 label'
                                    bottom='Checkbox3 hint'
                                />
                            </Fieldset>
                        </FormCol>
                    </FormRow>
                    <FormRow>
                        <FormCol>
                            <Files
                                id='file'
                                label='File choice'
                                text='Add'
                                files={files}
                                onChange={onFilesChange}
                                top='File top'
                                bottom='File bottom'
                                multiple={true}
                                accept='image/*'
                                disabled={false}
                                required={true}
                            />
                        </FormCol>
                        <FormCol>
                            <CheckboxList
                                id='checkboxlist'
                                label='Checkbox List'
                                required={true}
                                disabled={false}
                                options={checkboxlist}
                                onChange={setCheckboxList}
                            />
                        </FormCol>
                    </FormRow>
                    <FormRow>
                        <FormCol>
                            <Image
                                id='image'
                                image={image}
                                onChange={setImage}
                                text={<span><Icon.Image/><br/>Выберите изображение</span>}
                                required
                                label='Обложка'
                                bottom='Выберите файл'
                                placeholder='https://telefrag.hb.bizmrg.com/cover/d3cbfb168e7a1fcf.jpeg'
                            />
                        </FormCol>
                        <FormCol/>
                    </FormRow>
                </Form>
            </Panel>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} close={false}>
                Следует отметить, что начало повседневной работы по формированию позиции требует определения и уточнения системы обучения кадров, соответствующей насущным потребностям. Задача организации, в особенности же социально-экономическое развитие способствует повышению качества существующих финансовых и административных условий. Приятно, граждане, наблюдать, как реплицированные с зарубежных источников, современные исследования освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Прежде всего, современная методология разработки прекрасно подходит для реализации системы массового участия. Лишь некоторые особенности внутренней политики, инициированные исключительно синтетически, смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. Банальные, но неопровержимые выводы, а также активно развивающиеся страны третьего мира преданы социально-демократической анафеме. Каждый из нас понимает очевидную вещь: семантический разбор внешних противодействий обеспечивает широкому кругу (специалистов) участие в формировании приоретизации разума над эмоциями. Ясность нашей позиции очевидна: убеждённость некоторых оппонентов обеспечивает актуальность вывода текущих активов. Но перспективное планирование влечет за собой процесс внедрения и модернизации поэтапного и последовательного развития общества. Как уже неоднократно упомянуто, тщательные исследования конкурентов призывают нас к новым свершениям, которые, в свою очередь, должны быть смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.
            </Modal>         
            <Alert
                icon='https://dailytelefrag.ru/warning.png'
                type='round'
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title='Заголовок'
                message='Тестовое сообщение'
                close='Понятно'
                closeType='Success'
            />
            <Confirm
                icon='https://dailytelefrag.ru/warning.png'
                type='square'
                isOpen={isConfirmOpen}
                onCancel={() => { setIsConfirmOpen(false); alert('Cancel'); }}
                onConfirm={() => { setIsConfirmOpen(false); alert('Confirm'); }}
                title='Заголовок'
                message='Тестовое сообщение'
                cancel='Отменить'
                confirm='Продолжить'
                cancelType='Error'
                confirmType='Success'
            />
            <Prompt
                value='Hello!'
                isOpen={isPromptOpen}
                onCancel={() => setIsPromptOpen(false)}
                onSubmit={(s) => { setIsPromptOpen(false); alert(s); }}
                title='Заголовок'
                top='Сверху'
                bottom='Снизу'
                submit='Ввести'
                submitType='Error'
                //limit={5}
            />
        </Page>
    </Layout>
    );
}

export default App;

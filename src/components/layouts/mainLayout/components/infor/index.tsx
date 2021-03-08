import React from 'react';
import { Form, Upload, Drawer, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useConnect as globalModel } from 'model';
import Icon from 'components/common/icon';
import Input from 'components/common/input';
import Button from 'components/common/button';
import Modal from './components/modal';
import { uploadMaterial } from 'api/queries/material';
import { RcFile } from 'antd/lib/upload/interface';
import { updateInfo } from 'api/queries/company';
import { useConnect } from '../model/index';
import css from './index.less';
import Utils from 'common/utils';
import { detection } from 'api/queries/role';
import Code from './components/code';


export interface Props extends FormComponentProps { }

const { Item: FormItem, create: createFrom } = Form;

const Infor: React.FC<Props> = ({ form }) => {

  const [store, dispatch] = useConnect();
  const [globalStore, globalDispatch] = globalModel();
  const { company, user, imageUrl, visible, UpdateInfo, codeForm, state } = store;
  const { getFieldDecorator } = form;

  const [showModal, setShowModal] = React.useState(false);
  //   const [state, setState] = React.useState<boolean>(false);
  //   const [codeForm, setCodeForm] = React.useState('');
  const modalItems = {
    visible: showModal,
    title: <div>
      <h4 style={{ lineHeight: '30px' }}>{state ? '已向超级管理员发送了短信验证请求' : '您正在进行敏感操作'}</h4>
      <h4 style={{ lineHeight: '30px', color: state && '#4CD964' }}>{state ? `接收验证码的手机号为：${user.tel && user.tel}` : '请验证超级管理员身份'}</h4>
    </div>,
    width: 500,
    hasLine: false,
    hiddenFooter: false,
    isIcon: true,
    onOk: () => {
      detection(user.tel && user.tel, codeForm).then(res => {
        setShowModal(!res);
        dispatch({
          type: 'update',
          payload: {
            UpdateInfo: false
          }
        });
        Utils.message('验证成功，请设置企业信息', 'success');
      });
    },
    onCancel: () => {
    //   setState(false);
      dispatch({
        type: 'update',
        payload: {
          state: false
        }
      });
      setShowModal(false);
    }
  };

  React.useEffect(() => {
    dispatch({
      type: 'getInfo',
    });
  }, []);

  function beforeUpload(file: RcFile, FileList: RcFile[]) {
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('不得超过10M!');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', '0');
    uploadMaterial(formData).then((data) => {
      dispatch({
        type: 'update',
        payload: {
          imageUrl: data.data.url
        }
      });
    });

    return false;
  }

  // icon取消
  function handleClose() {
    dispatch({
      type: 'update',
      payload: {
        visible: false,
        UpdateInfo: true
      }
    });
    dispatch({
      type: 'update',
      payload: {
        state: false
      }
    });
  }

  // 修改信息
  function handleSubmit() {
    form.validateFields(async (err, value) => {
      form.setFieldsValue({
        code: 'null'
      });
      const { userName, name, tel } = value;
      if (!err) {
        await updateInfo({ userName: userName.trim(), logo: imageUrl, name: name.trim(), tel: tel, id: company.id, rEmployeeId: user.id });
        dispatch({
          type: 'getInfo',
        });
        dispatch({
          type: 'update',
          payload: {
            state: false,
            UpdateInfo: true
          }
        });
        globalDispatch({
          type: 'init'
        });
      }
    });
  }
  return (
    <Drawer className={css.drawerBox}
      title={<img style={{ height: '21px', width: '137px' }} src="https://img.alicdn.com/imgextra/i1/4074958541/O1CN01yQosFB2CxpOE9k0uX_!!4074958541.png" alt="" />}
      height={window.innerHeight} placement="top"
      visible={visible} onClose={handleClose}
    >
      <h4 className={css.title}>
                企业信息
      </h4>
      <Form className={css.drawer} >
        <div className={css.basicInformation}>
          <span className={css.line} />
          <span>
                        基本信息
          </span>
          {
            UpdateInfo ? (<div className={css.infoBox}>
              <p className={css.Icon}>企业名称</p>
              <p className={css.enterpriseName}>{company.name}</p>
              <p className={css.Icon}>企业Logo</p>
              <img src={company.logo} alt="" className={css.enterImg} />
            </div>) : (
              <>
                <FormItem label="企业名称" className={css.formName}>
                  {
                    getFieldDecorator('name', {
                      initialValue: company.name ? company.name : '',
                      rules: [
                        { required: true, message: '请输入企业名称!' },
                        {
                          whitespace: true,
                          message: '企业名称不能为空',
                        }
                      ],
                    })(
                      <Input autoComplete="off" className={css.infoIp} placeholder="请填写企业名称" />,
                    )
                  }
                </FormItem>
                <FormItem label="企业Logo">
                  {
                    getFieldDecorator('imageUrl', {
                      initialValue: imageUrl ? imageUrl : '',
                      rules: [
                        { required: true, message: '请上传企业Logo!' },
                      ],
                    })(
                      <Upload
                        action={PROCESS_ENV.ENV_API + '/material/saas/material/upload'}
                        accept="image/jpg,image/jpeg,image/png"
                        listType="picture-card"
                        className={css.Upload}
                        headers={{
                          authorization: localStorage.getItem('token')
                        }
                        }
                        showUploadList={false}
                        // data={{ key: key }}
                        beforeUpload={beforeUpload}
                      >
                        {
                          imageUrl ? <img src={imageUrl} className={css.UploadImg} /> : (
                            <div>
                              <Icon className={css.uploadIcon} type={'plus'} />
                            </div>
                          )
                        }
                        {
                          !!imageUrl && <div className={css.btns}>
                            <span
                              onClick={e => {
                                // e.stopPropagation();
                                // onChange();
                              }}
                            >
                            替换
                            </span>
                          </div>
                        }
                      </Upload>
                    )
                  }
                </FormItem>
              </>
            )
          }
        </div>
        <div className={css.headInformation}>
          <span className={css.line} />
          <span>
                        企业负责人信息
          </span>
          {
            UpdateInfo ? (
              <div className={css.infoBox}>
                <p className={css.Icon}>姓名</p>
                <p className={css.enterpriseName}>{user.name}</p>
                <p className={css.Icon}>手机号</p>
                <p className={css.tel}>{user.tel}</p>
              </div>
            ) : (
              <>
                <FormItem label="姓名" className={css.formName}>
                  {
                    getFieldDecorator('userName', {
                      initialValue: user.name ? user.name : '',
                      rules: [
                        { required: true, message: '请输入名称!' },
                        {
                          whitespace: true,
                          message: '名称不能为空',
                        }
                      ],
                    })(
                      <Input autoComplete="off" className={css.infoIp} placeholder="请输入名称!" />,
                    )
                  }
                </FormItem>
                <FormItem label="手机号" className={css.formName}>
                  {
                    getFieldDecorator('tel', {
                      initialValue: user.tel ? user.tel : '',
                      rules: [
                        { required: true, message: '请输入手机号!' },
                        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号!' },
                      ],
                    })(
                      <Input autoComplete="off" className={css.infoIp} placeholder="请输入手机号！" />,
                    )
                  }
                  <span className={css.warnTel}>该手机号码用于后台某些敏感行为的操作验证，请如实填写</span>
                </FormItem>
              </>
            )
          }
        </div>
      </Form>
      <div
        // className={css.buttonBox}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        {
          UpdateInfo ? (
            <Button onClick={() => {
              setShowModal(true);
              //   dispatch({
              //     type: 'update',
              //     payload: {
              //       UpdateInfo: false
              //     }
              //   });
            }} type="primary">
             编辑
            </Button>
          ) : (
            <div>
              <Button
                style={{ marginRight: '10px' }}
                onClick={() => {
                  dispatch({
                    type: 'update',
                    payload: {
                      UpdateInfo: true
                    }
                  });
                  // setUpdateInfo(true);
                  //   onClose();
                  dispatch({
                    type: 'update',
                    payload: {
                      UpdateInfo: true
                    }
                  });
                }} >
                取 消
              </Button>
              <Button onClick={handleSubmit} type="primary">
                保 存
              </Button>
            </div>
          )
        }
      </div>
      <Modal {...modalItems}>
        <Code />
      </Modal>
    </Drawer>
  );
};

Infor.defaultProps = {};

export default createFrom()(Infor);

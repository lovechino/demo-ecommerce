"use client";

import { Modal, Form, Input, Radio, DatePicker, Button } from "antd";

import { useAppSelector } from "@/Redux/hook";
import dayjs from "dayjs";
import { UserProfile } from "@/Utils/type";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UpdateProfileModal = ({ open, onClose }: Props) => {
  const user: UserProfile =
    useAppSelector((state) => state.user.user) || ({} as UserProfile);
  const [form] = Form.useForm();

  const handleUpdate = (values: UserProfile) => {
    console.log("Updated values:", values);
    // TODO: Gửi dữ liệu lên server
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Chỉnh sửa thông tin tài khoản"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={{
          FullName: user?.FullName,
          BirthDay: user?.BirthDay ? dayjs(user.BirthDay) : null,
          Gender: user?.Gender,
          Phone: user?.Phone,
          Address: user?.Address,
        }}
      >
        <Form.Item
          label="Họ và tên:"
          name="FullName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Ngày sinh:" name="BirthDay">
          <DatePicker format="DD/MM/YYYY" className="w-full" />
        </Form.Item>

        <Form.Item label="Giới tính:" name="Gender">
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Số điện thoại:"
          name="Phone"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ:" name="Address">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Cập nhật tài khoản
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProfileModal;

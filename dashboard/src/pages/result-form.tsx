import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Space } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { createScanResultStore } from "@stores/scanResult";
import moment from "moment";
import { useRouter } from "next/router";

const { TextArea } = Input;
const { Option } = Select;

const ScanResultForm = () => {
  const { createScanResult, loading } = createScanResultStore();

  const [form] = Form.useForm();

  const router = useRouter();

  // useEffect(() => {
  //   return form.resetFields();
  // }, []);

  const onFinish = async (values: any) => {
    try {
      const convertIntoTimeStamp = (isoString: string) => {
        return moment(new Date(isoString)).format("YYYY-MM-DD HH:mm");
      };

      const convertedValues = {
        ...values,
        queuedAt: convertIntoTimeStamp(values.queuedAt),
        scanningAt: values.scanningAt
          ? convertIntoTimeStamp(values.scanningAt)
          : null,
        finishedAt: values.finishedAt
          ? convertIntoTimeStamp(values.finishedAt)
          : null,
      };

      await createScanResult(convertedValues);
      // get back to the dashboard
      router.push("/");
    } catch (e) {}
  };

  return (
    <div className="flex flex-col items-center mt-[10%] min-h-screen p-m w-full">
      <h1 className="text-white">Create Scan Result</h1>
      <Form
        form={form}
        onFinish={onFinish}
        className="w-full max-w-[500px] mt-m"
        layout="vertical"
      >
        <Form.Item
          name="status"
          label={<span className="text-white">Status</span>}
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status">
            <Option value="Queued">Queued</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Success">Success</Option>
            <Option value="Failure">Failure</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="repositoryName"
          label={<span className="text-white">Repository Name</span>}
          rules={[
            { required: true, message: "Please enter the repository name" },
          ]}
        >
          <Input placeholder="Enter repository name" />
        </Form.Item>

        <span className="text-white">Findings</span>

        <Form.List name="findings">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space
                  key={field.key}
                  direction="vertical"
                  className="mt-m w-full border border-white rounded-m p-m"
                >
                  <p className="text-white">{`No. ${index + 1} Finding`}</p>
                  <Form.Item
                    {...field}
                    label={<span className="text-white">Finding Type</span>}
                    name={[field.name, "type"]}
                    rules={[
                      { required: true, message: "Please enter the type" },
                    ]}
                  >
                    <Input placeholder="Enter finding type (e.g., sast)" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={<span className="text-white">Rule ID</span>}
                    name={[field.name, "ruleId"]}
                    rules={[
                      { required: true, message: "Please enter the rule ID" },
                    ]}
                  >
                    <Input placeholder="Enter rule ID (e.g., G402)" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={<span className="text-white">File Path</span>}
                    name={[field.name, "location", "path"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the file path",
                      },
                    ]}
                  >
                    <Input placeholder="Enter file path (e.g., connectors/apigateway.go)" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={<span className="text-white">Line Number</span>}
                    name={[
                      field.name,
                      "location",
                      "positions",
                      "begin",
                      "line",
                    ]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the line number",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter line number (e.g., 60)"
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={<span className="text-white">Description</span>}
                    name={[field.name, "metadata", "description"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a description",
                      },
                    ]}
                  >
                    <TextArea rows={2} placeholder="Enter description" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={<span className="text-white">Severity</span>}
                    name={[field.name, "metadata", "severity"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the severity",
                      },
                    ]}
                  >
                    <Select placeholder="Select severity">
                      <Option value="LOW">LOW</Option>
                      <Option value="MEDIUM">MEDIUM</Option>
                      <Option value="HIGH">HIGH</Option>
                    </Select>
                  </Form.Item>

                  <Button
                    type="dashed"
                    onClick={() => remove(field.name)}
                    block
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Finding
                  </Button>
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="mt-m"
                >
                  Add Finding
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="queuedAt"
          label={<span className="text-white">Queued At</span>}
          rules={[{ required: true, message: "Please select queued time" }]}
        >
          <DatePicker
            className="w-full"
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item
          name="scanningAt"
          label={<span className="text-white">Scanning At</span>}
          rules={[{ required: true, message: "Please select scanning time" }]}
        >
          <DatePicker
            className="w-full"
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item
          name="finishedAt"
          label={<span className="text-white">Finished At</span>}
          rules={[{ required: true, message: "Please select finished time" }]}
        >
          <DatePicker
            className="w-full"
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-m"
          >
            {!loading && "Create Scan Result"}
            {loading && <LoadingOutlined />}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScanResultForm;

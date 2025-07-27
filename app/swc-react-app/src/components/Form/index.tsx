import React from "react";
import { Form, Row, Col } from "antd";
import FormItem from "./FormItem";
import FormItemContent from "./FormItemContent";
import type { SchamaType } from "./FormType";

const CustomForm = (props: { schemas: SchamaType[] }) => {
  const { schemas = [] } = props;
  return (
    <Form>
      <Row>
        {schemas.map((schema, index) => {
          return (
            <Col key={index} span={6}>
              <FormItem label={schema.label}>
                <div>
                  <FormItemContent type={schema.type} />
                </div>
              </FormItem>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default CustomForm;

// export * from "./FormType";

import { Card } from "antd";
import React, { memo } from "react";
import WordCloud from "react-d3-cloud";

function TagCloud({ data }) {
  const fontSizeMapper = word => Math.log2(word.value) * 5;
  return (
    <Card style={{ maxWidth: 352, marginLeft: 30 }}>
      <WordCloud data={data} fontSizeMapper={fontSizeMapper} width="300" height="300" />
    </Card>
  );
}

export default memo(TagCloud);

import { GeoBoundingBox, Point, Rectangle } from "../../../types";

const pointsToRectangle = (point1: Point, point2: Point): Rectangle => {
  const rectangle = ({} as any) as Rectangle;

  rectangle.left = Math.min(point1.x, point2.x);
  rectangle.bottom = Math.max(point1.x, point2.x) - rectangle.left;
  rectangle.top = Math.min(point1.y, point2.y);
  rectangle.right = Math.max(point1.y, point2.y) - rectangle.top;

  return rectangle;
};

const rectangleIntersects = (rectangle1: Rectangle, rectangle2: Rectangle): boolean =>
  rectangle1.left <= rectangle2.left + rectangle2.bottom &&
  rectangle2.left <= rectangle1.left + rectangle1.bottom &&
  rectangle1.top <= rectangle2.top + rectangle2.right &&
  rectangle2.top <= rectangle1.top + rectangle1.right;

const boundingBoxToRectangle = (boundingBox: GeoBoundingBox): Rectangle => {
  const point1 = { x: boundingBox.latMin, y: boundingBox.lonMin };
  const point2 = { x: boundingBox.latMax, y: boundingBox.lonMax };
  return pointsToRectangle(point1, point2);
};

/**
 * Check if two geolocational bounding boxes intersect
 *
 * @param boundingBox1
 * @param boundingBox2
 */
export const boundingBoxesIntersects = (
  boundingBox1: GeoBoundingBox,
  boundingBox2: GeoBoundingBox
) => {
  const rectangle1 = boundingBoxToRectangle(boundingBox1);
  const rectangle2 = boundingBoxToRectangle(boundingBox2);

  return rectangleIntersects(rectangle1, rectangle2);
};

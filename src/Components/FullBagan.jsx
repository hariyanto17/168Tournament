import * as d3 from "d3";
import { useEffect, useRef } from "react";
import data from "../data.json";
const leftData = data.children[0];
const rightData = data.children[1];

const FullBagan = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Dimensions for the SVG container
    const width = 928;
    const height = 1200;
    // Jarak horizontal antar node telah ditingkatkan lagi
    const horizontalSpacing = 400;

    // The tree layout calculates positions for all nodes
    // Nilai pertama di nodeSize mengontrol jarak vertikal
    const tree = d3.tree().nodeSize([30, 80]);

    // Custom link generator for horizontal links with a curve
    const diagonal = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    // Initial setup of the SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", "auto")
      .attr("viewBox", [0, 0, width, height])
      .attr(
        "style",
        "max-width: 100%; height: auto; font: 12px sans-serif; user-select: none;"
      );

    // Create a group for all zoomable content
    const g = svg.append("g");

    // Create groups for each bracket half
    const leftGroup = g.append("g").attr("id", "left-bracket");
    const rightGroup = g.append("g").attr("id", "right-bracket");

    // Add zoom functionality with boundaries
    // Menambahkan batasan zoom, mencegah zoom out terlalu jauh
    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 1]) // Batas zoom: 0.2 (zoom out minimum) hingga 1 (zoom normal)
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);
    // Mengatur zoom awal ke 0.2
    svg.call(zoom.transform, d3.zoomIdentity.scale(0.2));

    // The update function handles rendering and transitions for one half of the bracket
    function update(event, root, group, isLeft) {
      const duration = event?.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      tree(root);

      let top = root;
      let bottom = root;
      root.eachBefore((node) => {
        if (node.x < top.x) top = node;
        if (node.x > bottom.x) bottom = node;
      });

      const treeHeight = bottom.x - top.x;
      const verticalOffset = height / 2 - (top.x + treeHeight / 2);

      const node = group.selectAll("g.node").data(nodes, (d) => d.id);

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => {
          const parentY = d.parent ? d.parent.y0 : root.y0;
          const parentX = d.parent ? d.parent.x0 : root.x0;
          const y = isLeft
            ? width / 2 - parentY - horizontalSpacing / 2
            : width / 2 + parentY + horizontalSpacing / 2;
          return `translate(${y},${parentX + verticalOffset})`;
        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(event, root, group, isLeft);
        });

      nodeEnter
        .append("circle")
        .attr("r", 4.5)
        .attr("fill", (d) => (d._children ? "#fff" : "#888"))
        .attr("stroke", "currentColor")
        .attr("stroke-width", 1.5);
      
      nodeEnter
        .append("rect")
        .attr("y", -10)
        .attr("height", 20)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#1e293b")
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#475569")
        .attr("stroke-width", 1);
      
      nodeEnter
        .append("text")
        .attr("dy", "0.31em")
        .attr("text-anchor", (d) => (isLeft ? "end" : "start"))
        .text((d) => (d.data.name === "TBD" ? d.data.title : d.data.name))
        .each(function(d) {
          const textElement = d3.select(this);
          const textWidth = textElement.node().getComputedTextLength();
          const rect = d3.select(this.parentNode).select("rect");
          rect.attr("width", textWidth + 12)
              .attr("x", isLeft ? -(textWidth + 12 + 6) : 6);
        })
        .clone(true)
        .lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "#1e293b");

      node
        .merge(nodeEnter)
        .transition(d3.transition().duration(duration))
        .attr("transform", (d) => {
          const y = isLeft
            ? width / 2 - d.y - horizontalSpacing / 2
            : width / 2 + d.y + horizontalSpacing / 2;
          return `translate(${y},${d.x + verticalOffset})`;
        })
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      node
        .exit()
        .transition(d3.transition().duration(duration))
        .remove()
        .attr("transform", (d) => {
          const parentY = d.parent ? d.parent.y : root.y;
          const parentX = d.parent ? d.parent.x : root.x;
          const y = isLeft
            ? width / 2 - parentY - horizontalSpacing / 2
            : width / 2 + parentY + horizontalSpacing / 2;
          return `translate(${y},${parentX + verticalOffset})`;
        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      const link = group.selectAll("path.link").data(links, (d) => d.target.id);

      const linkEnter = link
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", (d) => {
          const o = {
            x: d.source.x0 + verticalOffset,
            y: isLeft
              ? width / 2 - d.source.y0 - horizontalSpacing / 2
              : width / 2 + d.source.y0 + horizontalSpacing / 2,
          };
          return diagonal({ source: o, target: o });
        })
        .attr("stroke", "#555")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.4);

      link
        .merge(linkEnter)
        .transition(d3.transition().duration(duration))
        .attr("d", (d) => {
          const sourceNode = {
            x: d.source.x + verticalOffset,
            y: isLeft
              ? width / 2 - d.source.y - horizontalSpacing / 2
              : width / 2 + d.source.y + horizontalSpacing / 2,
          };
          const targetNode = {
            x: d.target.x + verticalOffset,
            y: isLeft
              ? width / 2 - d.target.y - horizontalSpacing / 2
              : width / 2 + d.target.y + horizontalSpacing / 2,
          };
          return diagonal({ source: sourceNode, target: targetNode });
        });

      link
        .exit()
        .transition(d3.transition().duration(duration))
        .remove()
        .attr("d", (d) => {
          const o = {
            x: d.source.x + verticalOffset,
            y: isLeft
              ? width / 2 - d.source.y - horizontalSpacing / 2
              : width / 2 + d.source.y + horizontalSpacing / 2,
          };
          return diagonal({ source: o, target: o });
        });

      root.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    const leftRoot = d3.hierarchy(leftData);
    const rightRoot = d3.hierarchy(rightData);

    leftRoot.each((d) => { d.x0 = leftRoot.x; d.y0 = leftRoot.y; });
    rightRoot.each((d) => { d.x0 = rightRoot.x; d.y0 = rightRoot.y; });

    update(null, leftRoot, leftGroup, true);
    update(null, rightRoot, rightGroup, false);

    // Menambahkan garis yang menghubungkan Final dari kedua grup
    const leftFinalNode = leftRoot.descendants().find(d => d.data.title === "Final");
    const rightFinalNode = rightRoot.descendants().find(d => d.data.title === "Final");
    
    if (leftFinalNode && rightFinalNode) {
      const leftFinalPos = {
        x: leftFinalNode.x + (height / 2 - (leftRoot.x + (leftRoot.descendants().find(d => d.x > leftRoot.x)?.x - leftRoot.x) / 2)),
        y: width / 2 - leftFinalNode.y - horizontalSpacing / 2
      };
      const rightFinalPos = {
        x: rightFinalNode.x + (height / 2 - (rightRoot.x + (rightRoot.descendants().find(d => d.x > rightRoot.x)?.x - rightRoot.x) / 2)),
        y: width / 2 + rightFinalNode.y + horizontalSpacing / 2
      };

      g.append("path")
        .attr("class", "final-link")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", 0.8)
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("d", () => {
          const source = { x: leftFinalPos.x, y: leftFinalPos.y };
          const target = { x: rightFinalPos.x, y: rightFinalPos.y };
          const linkGenerator = d3.linkHorizontal().x(d => d.y).y(d => d.x);
          return linkGenerator({ source: source, target: target });
        });
      
      // Menambahkan SVG trofi di tengah garis final menggunakan fetch
      fetch("tropy.svg")
        .then(response => response.text())
        .then(svgText => {
          const trophySize = 30;
          const trophyX = (leftFinalPos.y + rightFinalPos.y) / 2 - trophySize / 2;
          const trophyY = (leftFinalPos.x + rightFinalPos.x) / 2 - trophySize / 2;

          const trophySvgElement = new DOMParser().parseFromString(svgText, "image/svg+xml").documentElement;
          
          d3.select(trophySvgElement)
            .attr("width", trophySize)
            .attr("height", trophySize)
            .attr("x", trophyX)
            .attr("y", trophyY)
            .style("pointer-events", "none");
            
          g.node().appendChild(trophySvgElement);
        })
        .catch(error => console.error("Error loading trophy SVG:", error));
    }
    
    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} className="cursor-grab w-full"></svg>
    </div>
  );
};

export default FullBagan;

package oracle

import (
	_ "embed"
	"testing"

	"github.com/grafana/xk6-sql/sqltest"
)

//go:embed testdata/script.js
var script string

func TestIntegration(t *testing.T) { //nolint:paralleltest
	sqltest.RunScript(t, "oracle", "test_db", script)
}
